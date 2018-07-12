/**
 * @fileoverview ast type interface
 */

export type TType = 'command' | 'assign' | 'if' | 'for' | 'end' | 'skip' | 'error';
export type TArg = 'num' | 'arg' | 'str' | 'exp' | 'var' | 'err' | 'comstart' | 'comend' | 'emp';
export type TExpr = '+' | '-' | '*' | '/' | '=' | '<' | '>' | '<=' | '>=' | '==' | '!=';

export enum TYPE {
    COMMAND = 'command',
    ASSIGN = 'assign',
    IF = 'if',
    FOR = 'for',
    END = 'end',
    SKIP = 'skip',
    ERROR = 'error',
}

export enum ARGUMENT {
    NUMBER = 'num',
    ARGUMENT = 'arg',
    STRING = 'str',
    EXPRESSION = 'exp',
    VARIABLE = 'var',
    ERROR = 'err',
    COMSTART = 'comstart',
    COMEND = 'comend',
    EMP = 'emp',
}

export enum EXPRESSION {
    PLUS = '+',
    MINUS = '-',
    TIMES = '*',
    DIVIDE = '/',
    EQUAL = '=',
    SMALLERTHAN = '<',
    GREATERTHAN = '>',
    SMALLEROREQUAL = '<=',
    GREATEROREQUAL = '>=',
    EQUALEQUAL = '==',
    NOTEQUAL = '!=',
}

export interface IArgs {
    type: TArg;
    va: any;
}

export interface IAs {
    type: TType;
    val: string;
    args: IArgs[];
}

type TAst = IAs[];

export default TAst;
