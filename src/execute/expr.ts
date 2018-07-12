/**
 * @fileoverview execute target ast with external function
 */

import { EXPRESSION, TExpr } from '../types/ast';

export const checkExpr = (expr: string): TExpr | null => {
    if (expr === EXPRESSION.PLUS
        || expr === EXPRESSION.MINUS
        || expr === '*'
        || expr === '/'
        || expr === '='
        || expr === '<'
        || expr === '>'
        || expr === '<='
        || expr === '>='
        || expr === '=='
        || expr === '!=') {

        return expr;

    } else {
        return null;
    }
};

export const checkExist = (anything: any): boolean => {
    if (anything === undefined) {
        return false;
    }
    return true;
};

const executeExpr = (exprE: string, arg1: string | number, arg2?: string | number): string | number => {
    const expr: TExpr | null = checkExpr(exprE);
    if (!expr) {
        throw new Error('invalid expression exception');
    }

    switch (expr) {
        case EXPRESSION.PLUS:
            if (!checkExist(arg2)) {
                throw new Error('not enough argument exception');
            }
            if (typeof arg1 === 'string') {
                return arg1 + arg2;
            } else if (typeof arg2 === 'string') {
                return arg1 + arg2;
            } else {
                return arg1 + (arg2 as any);
            }
        case EXPRESSION.MINUS:
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
        case '!=':
            if (!checkExist(arg2)) {
                throw new Error('not enough argument exception');
            }
            if (typeof arg1 === 'number' && typeof arg2 === 'number') {
                return arg1 !== arg2 ? 1 : 0;
            } else {
                throw new Error('illegal calculation exception');
            }
        default:
            throw new Error('illegal calculation exception');
    }
};

export default executeExpr;
