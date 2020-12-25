import { atom } from 'recoil';
import PhotoRandomResult from '../interfaces/PhotoRandomResult';

export const valueState = atom({
    key: 'valueState',
    default: ''
});

export const photosState = atom<PhotoRandomResult[]>({
    key: 'photosState',
    default: []
});

export const isGroupedState = atom({
    key: 'isGroupedState',
    default: false
});
