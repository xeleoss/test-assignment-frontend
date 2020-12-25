import Photo from './Photo';

export default interface PhotoRandomResult {
    search: string;
    key: string;
    elements: Photo[];
}
