/**
 * @author WMXPY
 * @fileoverview error throw
 */

export interface IErrorList { [key: number]: string; }

export enum ERROR_CODE {
    ERROR_THROW_FAILED = 100,
    INSTANT_FUNCTION_EXECUTE_FAILED = 101,
    INSTANT_EXTERNAL_FUNCTION_EXECUTE_FAILED = 102,

    UNDEFINED_VARIABLE = 201,

    UNKNOWN_ERROR_CODE = 900,
}

export const errorList: IErrorList = {
    100: 'Error throw failed',
    101: 'Instant function execute failed',
    102: 'Instant instant function execute failed',
    201: 'Undefined variable exception',
    900: 'Unknown error code',
};

export const error = (code: number): Error => {
    let newError: Error = new Error();
    if (errorList[code]) {
        newError.message = code + ': ' + errorList[code];
        newError.name = errorList[code];
        (newError as any).code = code;
        return newError;
    }
    newError.message = code + ': ' + errorList[ERROR_CODE.UNKNOWN_ERROR_CODE];
    newError.name = errorList[ERROR_CODE.UNKNOWN_ERROR_CODE];
    (newError as any).code = ERROR_CODE.UNKNOWN_ERROR_CODE;
    return newError;
};
