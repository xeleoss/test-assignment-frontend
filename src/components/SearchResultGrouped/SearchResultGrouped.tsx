import React from 'react';
import Image from '../Image/Image';
import { useRecoilValue } from 'recoil';
import { photosState } from '../../recoil/atoms';
import './SearchResultGrouped.scss';

type Props = {
    className: string;
};

export function SearchResultGrouped (props: Props) {
    const photos = useRecoilValue(photosState);
    const photosGrouped: any = {};
    photos.forEach(x => {
        x.elements.forEach(p => {
           if (photosGrouped[p.tag] === undefined) photosGrouped[p.tag] = [];

           photosGrouped[p.tag].push({url: p.image_url, tag: p.tag});
       })
    });

    return (
        <div className={props.className}>
            <div className="d-flex flex-column flex-wrap justify-content-center search-result-grouped">
                {Object.keys(photosGrouped).map((groupedTag) => {
                    return (
                        <Image
                            key={groupedTag}
                            groupedTag={groupedTag}
                            images={photosGrouped[groupedTag]}
                        />
                    );
                })}
            </div>
        </div>
    );
}
