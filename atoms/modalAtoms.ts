import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';
import { Movie, Product } from '../typings';

export const modalState = atom({
    key: 'modalState',
    default: false,
});

export const movieState = atom<Movie | DocumentData | null>({
    key: 'movieState',
    default: null,
});

export const productState = atom<Product[] | null>({
    key: 'movieState',
    default: [
        {
            id: 'asdga',
            name: 'basic',
            price: 10,
            active: true,
            metadata: {
                videoQuality: 'good',
                resolution: '720p',
                portability: true,
            },
        },
        {
            id: 'ddgyj54q12',
            name: 'standard',
            price: 15,
            active: true,
            metadata: {
                videoQuality: 'better',
                resolution: '1080p',
                portability: true,
            },
        },
        {
            id: '12das1',
            name: 'premium',
            price: 20,
            active: true,
            metadata: {
                videoQuality: 'best',
                resolution: '4k + HDR',
                portability: true,
            },
        },
    ],
});
