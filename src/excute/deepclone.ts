/**
 * @fileoverview deepclone helper function
 */

export const deepCloneArray: <T>(content: T[]) => T[] = (content) => {
    return [...content];
};

export const deepCloneObject: <T>(content: { [key: string]: T }) => { [key: string]: T } = (content) => {
    return Object.assign({}, content);
};
