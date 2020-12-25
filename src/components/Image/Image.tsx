import React  from 'react';
import { useSetRecoilState } from 'recoil';
import { valueState } from '../../recoil/atoms';
import './Image.scss';
import clsx from 'clsx';

type Image = {
    url: string;
    tag: string;
}

type Props = {
    images: Image[];
    groupedTag?: string;
}

export default function Image(props: Props) {
    const setValue = useSetRecoilState(valueState);
    const classes = [];
    if (props.groupedTag) classes.push('d-flex flex-row border m-2 image-wrapper-grouped');
    else classes.push('m-2 d-flex border container flex-column border image-wrapper');

    return (
        <div className={props.groupedTag ? 'border p-2 m-2' : ''} >
            {props.groupedTag && <h6 className="ml-2">{props.groupedTag}</h6>}
            <div className={clsx(classes)}>
                {props.images.map(img => {
                    return (
                        <img
                            key={img.tag+img.url}
                            alt={img.tag}
                            src={img.url}
                            onClick={() => setValue(img.tag)}
                            className="p-1 border image"
                        />
                    );
                })}
            </div>
        </div>
    );
}
