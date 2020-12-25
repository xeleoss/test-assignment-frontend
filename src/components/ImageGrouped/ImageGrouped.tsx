import React  from 'react';
import PhotoRandomResult from '../../interfaces/PhotoRandomResult';
import { useSetRecoilState } from 'recoil';
import { valueState } from '../../recoil/atoms';
import './Image.scss';

type Props = {
    photoRandomResult: PhotoRandomResult;
}

export default function ImageGrouped({photoRandomResult}: Props) {
    const setValue = useSetRecoilState(valueState);
    return (
        <div key={photoRandomResult.key} className="col-sm-3 m-2 d-flex flex-column border container image-wrapper">
            {photoRandomResult.elements.map(photo => {
                return (
                    <img
                        key={photoRandomResult+photo.tag+photo.image_url}
                        alt={photo.tag}
                        src={photo.image_url}
                        onClick={() => setValue(photo.tag)}
                        className="p-1 border image"
                    />
                );
            })}
        </div>
    );
}
