/**
 * @fileoverview error throw
 */

export type TError = 100 | 101;
export interface IErrorList { [key: number]: string; }

export const errorList: IErrorList = {
    100: 'error throw failed',
    101: 'instant function excute failed',
};

export const error = (code: TError): Error => {
    if (errorList[code]) {
        return new Error(errorList[code]);
    } else {
        return new Error(errorList[100]);
    }
};
