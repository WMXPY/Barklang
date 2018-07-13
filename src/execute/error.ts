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
    STATEMENT_END_NOT_MATCHED = 250,
    NOT_ENOUGH_ARGUMENT = 255,
    ILLEGAL_CALCULATION = 256,
    COMMAND_IS_UNDEFINED = 260,
    INVALID_EXPRESSION = 270,

    STRING_COMBINE_FAILED = 301,
    UNEXPECTED_ARGUMENT = 350,
    NAMESPACE_UNAVAILABLE = 351,
    NAMESPACE_OCCUPIED_INITIAL = 360,

    ANY_ERROR_CODE = 800,
    FOR_LOOP_IS_NOT_AVAILABLE = 820,

    UNKNOWN_ERROR_CODE = 900,
}

export const errorList: IErrorList = {
    100: 'Error throw failed',
    101: 'Instant function execute failed',
    102: 'Instant instant function execute failed',
    201: 'Undefined variable exception',
    250: 'Statement end not matched exception',
    255: 'Not enough argument exception',
    256: 'Illegal calculation exception',
    260: 'Command is not defined exception',
    270: 'Invalid expression exception',
    301: 'Combine failed exception',
    350: 'Unexpected argument exception',
    351: 'Namespace unavailable exception',
    360: 'Initial namespace is occupied',
    800: 'Any error code',
    820: 'For loop is not available',
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
