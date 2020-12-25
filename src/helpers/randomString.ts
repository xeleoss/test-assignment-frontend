import random from 'lodash/random';

export default function randomString(i: number, randomLength = true) {
    let rnd = '';
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2);

    if (randomLength) {
       return rnd.substring(0, random(1, i));
    }

    return rnd.substring(0, i);
};
