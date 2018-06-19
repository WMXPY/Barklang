/**
 * @fileoverview deepclone helper function
 */

export const deepCloneArray: <T>(content: T[]) => T[] = (content) => {
    return [...content];
};

export const deepCloneObject: <T>(content: T) => T = (content) => {
    return Object.assign({}, content);
};
