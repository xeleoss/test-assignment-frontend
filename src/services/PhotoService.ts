import PhotoDto from '../interfaces/PhotoDto';
import axios from 'axios';

type PhotoResult = {
    error: number;
    description: string;
    payload?: PhotoDto;
}

export default class PhotoService {
    private static url = 'https://api.giphy.com/v1/gifs/random';
    public static async getPhoto(tag: string): Promise<PhotoResult> {
        return await axios.get(this.url, {
            params: {
                api_key: 'gTJAO48YcpmrADUyo4opy4ES4g7iDBxx',
                tag
            }
        }).then(response => {
            const result: PhotoDto = response.data.data;
            if (!result?.image_url) {
                return {error: 1, description: `По тэгу '${tag}' ничего не найдено`};
            }

            return {
                error: 0,
                description: 'OK',
                payload: {
                    image_url: result.image_url,
                    tag
                }
            };
        }).catch(error => {
            return {error: 2, description: `Произошла http ошибка`};
        });
    }
}
