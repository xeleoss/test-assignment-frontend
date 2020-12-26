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
    const count = props.images.length;
    // 200 width, 1 border is block; 1 border, 4 margin is only image;
    const heightImage = (200-1-((1+4) * count)) / count;
    const classes = [];
    if (props.groupedTag) classes.push('mw-100 overflow-auto d-flex flex-row border  m-2 image-wrapper-grouped');
    else classes.push('m-2 d-flex border container flex-column border image-wrapper');

    return (
        <div className={props.groupedTag ? 'mw-100 border p-2 m-2' : ''} >
            {props.groupedTag && <h6 className="ml-2">{props.groupedTag}</h6>}
            <div className={clsx(classes)}>
                {props.images.map(img => {
                    return (
                        <img
                            key={img.tag+img.url}
                            height={heightImage}
                            alt={img.tag}
                            src={img.url}
                            onClick={() => setValue(img.tag)}
                            className="m-1 border image"
                        />
                    );
                })}
            </div>
        </div>
    );
}
