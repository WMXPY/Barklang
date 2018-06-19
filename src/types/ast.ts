/**
 * @fileoverview ast type interface
 */

export type TType = 'command' | 'assign' | 'if' | 'for' | 'end' | 'skip';
export type TArg = 'num' | 'str' | 'exp' | 'var' | 'err';
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
