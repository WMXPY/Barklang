/**
 * @fileoverview excute target ast with external function
 */

import { TExpr } from "../types/ast";

const checkExpr = (expr: string): TExpr | null => {
    if (expr === '+'
        || expr === '-'
        || expr === '*'
        || expr === '/'
        || expr === '='
        || expr === '<'
        || expr === '>'
        || expr === '<='
        || expr === '>='
        || expr === '==') {

        return expr;

    } else {
        return null;
    }
};

const checkExist = (anything: any): boolean => {
    if (anything === undefined) {
        return false;
    }
    return true;
};

const excuteExpr = (exprE: string, arg1: string | number, arg2?: string | number): string | number => {
    const expr: TExpr | null = checkExpr(exprE);
    if (!expr) {
        throw new Error('unvalid expression exception');
    }

    switch (expr) {
        case '+':
            if (!checkExist(arg2)) {
                throw new Error('not enough argument exception');
            }
            if (typeof arg1 === 'string') {
                return arg1 + arg2;
            } else if (typeof arg2 === 'string') {
                return arg1 + arg2;
            } else {
                if (arg2) {
                    return arg1 + arg2;
                } else {
                    return arg1;
                }
            }
        case '-':
            if (!checkExist(arg2)) {
                throw new Error('not enough argument exception');
            }
            if (typeof arg1 === 'number' && typeof arg2 === 'number') {
                return arg1 - arg2;
            } else {
                throw new Error('illegal calculation exception');
            }
        case '*':
            if (!checkExist(arg2)) {
                throw new Error('not enough argument exception');
            }
            if (typeof arg1 === 'number' && typeof arg2 === 'number') {
                return arg1 * arg2;
            } else {
                throw new Error('illegal calculation exception');
            }
        case '/':
            if (!checkExist(arg2)) {
                throw new Error('not enough argument exception');
            }
            if (typeof arg1 === 'number' && typeof arg2 === 'number') {
                return arg1 / arg2;
            } else {
                throw new Error('illegal calculation exception');
            }
        case '=':
            return arg1;
        case '<':
            if (!checkExist(arg2)) {
                throw new Error('not enough argument exception');
            }
            if (typeof arg1 === 'number' && typeof arg2 === 'number') {
                return arg1 < arg2 ? 1 : 0;
            } else {
                throw new Error('illegal calculation exception');
            }
        case '>':
            if (!checkExist(arg2)) {
                throw new Error('not enough argument exception');
            }
            if (typeof arg1 === 'number' && typeof arg2 === 'number') {
                return arg1 > arg2 ? 1 : 0;
            } else {
                throw new Error('illegal calculation exception');
            }
        case '<=':
            if (!checkExist(arg2)) {
                throw new Error('not enough argument exception');
            }
            if (typeof arg1 === 'number' && typeof arg2 === 'number') {
                return arg1 <= arg2 ? 1 : 0;
            } else {
                throw new Error('illegal calculation exception');
            }
        case '>=':
            if (!checkExist(arg2)) {
                throw new Error('not enough argument exception');
            }
            if (typeof arg1 === 'number' && typeof arg2 === 'number') {
                return arg1 >= arg2 ? 1 : 0;
            } else {
                throw new Error('illegal calculation exception');
            }
        case '==':
            if (!checkExist(arg2)) {
                throw new Error('not enough argument exception');
            }
            if (typeof arg1 === 'number' && typeof arg2 === 'number') {
                return arg1 === arg2 ? 1 : 0;
            } else {
                throw new Error('illegal calculation exception');
            }
    }

    return arg1;
};

export default excuteExpr;
