import React, { useEffect, useState } from 'react';
import { Alert, Button, FormControl } from 'react-bootstrap';
import clsx from 'clsx';
import './Search.scss';
import { useRecoilState } from 'recoil';
import { isGroupedState, photosState, valueState } from '../../recoil/atoms';
import Photo from '../../interfaces/Photo';
import PhotoService from '../../services/PhotoService';
import randomString from '../../helpers/randomString';
import PhotoRandomResult from '../../interfaces/PhotoRandomResult';

const searchRegexp = /[^a-z,\s]/gi;

type Props = {
    className: string;
};

export function Search ({
    className,
}: Props) {
    const [value, setValue] = useRecoilState(valueState);
    const [photos, setPhotos] = useRecoilState(photosState);
    const [isGrouped, setIsGrouped] = useRecoilState(isGroupedState);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [delayCounter, setDelayCounter] = useState(0);
    useEffect(() => {
        let effect: NodeJS.Timeout | undefined;
        if (delayCounter !== 0) {
            effect = setTimeout(async () => {
                const randomTag = randomString(10, true).replace(searchRegexp, '');
                clearErrorMessages();
                await addImage(randomTag, photos);
                setDelayCounter(delayCounter + 1);
            }, 5000);
        }
        return () => {
            if (effect) clearTimeout(effect);
        };
    }, [delayCounter]);

    const clearErrorMessages = () => {
        setErrorMessages([]);
    }

    const addErrorMessage = (error: string) => {
        setErrorMessages((prev) => [...prev, error]);
    }

    const addPhotos = (newPhotos: Photo[], tags: string, currentPhotos: PhotoRandomResult[]) => {
        setPhotos([...currentPhotos, {
            elements: newPhotos.map((x, i) => ({...x, tag: x.tag})),
            search: tags,
            key: Math.random().toString(),
        }]);
    };

    const addImage = async (tags: string,  currentPhotos: PhotoRandomResult[]) => {
        if (tags === 'delay') {
            setDelayCounter(1);
            return;
        }

        const tagsArray = tags.split(',').filter(x => !!x);
        const newValues: Photo[] = [];
        for (const tag of tagsArray) {
            const result = await PhotoService.getPhoto(tag);
            if (result.error !== 0) {
                addErrorMessage(result.description);
                continue;
            }

            newValues.push({
                image_url: result.payload!.image_url,
                tag
            });
        }

        if (!newValues.length) return;

        addPhotos(newValues, tags, currentPhotos);
    };

    const validateForm = (value: string): boolean => {
        if (value.length === 0) {
            addErrorMessage('заполните поле \'тег\'');
            return false;
        }

        clearErrorMessages();
        return true;
    };

    const clear = () => {
        clearErrorMessages();
        setValue('');
        setPhotos([]);
        setDelayCounter(0);
    }

    const onChangeValue = (v: string) => {
        v = v.replace(searchRegexp, '');
        v = v.replace(' ', '');
        setValue(v);
    }

    const onSearch = () => {
        clearErrorMessages();
        if (validateForm(value)) {
            setLoading(true);
            addImage(value, photos).finally(() => setLoading(false));
        }
    };

    return (
        <div className={clsx(className)}>
            <div className="search">
                <div className="d-flex justify-content-between search__buttons">
                    <div>
                        <FormControl
                            value={value}
                            onChange={x => onChangeValue(x.target.value)}
                            className="search__buttons-input"
                            placeholder="введите тег"
                        />
                    </div>
                    <Button
                        className="search__buttons-submit"
                        onClick={onSearch}
                        disabled={loading || delayCounter !== 0}
                    >
                        {loading || delayCounter ? "Загрузка..." : "Загрузить"}
                    </Button>
                    <Button
                        className="search__buttons-clear"
                        onClick={clear}
                    >
                        Очистить
                    </Button>
                    <Button
                        onClick={() => setIsGrouped(!isGrouped)}
                        className="search__buttons-grouped"
                    >
                        {isGrouped ? 'Разгруппировать' : 'Группировать'}
                    </Button>
                </div>
                <div className="alert-block">
                    {errorMessages.map((error, i) => (
                        <Alert
                            key={i}
                            className="ml-1 mt-2 pointer"
                            variant="danger"
                            dismissible
                            onClick={
                                () => setErrorMessages(prev => prev.filter(y => y !== error))
                            }
                        >
                            {error}
                        </Alert>
                    ))}
                </div>
            </div>
        </div>
    );
}
