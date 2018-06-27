/**
 * @fileoverview ast type interface
 */

export type TType = 'command' | 'assign' | 'if' | 'for' | 'end' | 'skip' | 'error';
export type TArg = 'num' | 'arg' | 'str' | 'exp' | 'var' | 'err' | 'comstart' | 'comend' | 'emp';
export type TExpr = '+' | '-' | '*' | '/' | '=' | '<' | '>' | '<=' | '>=' | '==' | '!=';

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
