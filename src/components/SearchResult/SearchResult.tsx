import React from 'react';
import Image from '../Image/Image';
import { useRecoilValue } from 'recoil';
import { photosState } from '../../recoil/atoms';
import './SearchResult.scss';

type Props = {
    className: string;
};

export function SearchResult (props: Props) {
    const photos = useRecoilValue(photosState);
    return (
        <div className={props.className}>
            <div className="d-flex flex-row flex-wrap justify-content-center row-cols-3 w-100 search-result">
                {photos.map((photoRandomResult) => {
                    return (
                        <Image
                            key={photoRandomResult.key}
                            images={photoRandomResult.elements.map(y => ({url: y.image_url, tag: y.tag}))}
                        />
                    );
                })}
            </div>
        </div>
    );
}
