/**
 * @fileoverview excute target ast with external function
 */

import { deepCloneArray } from "./deepclone";
import excuteExprValue from './expr';

import { internalList } from "./list";

import TAst, { IArgs, IAs } from "../types/ast";
import TExcute, { IExc, IVar, TVars } from "../types/excute";

const findVar = (val: string, vars: TVars): number => {
    for (let i: number = 0; i < vars.length; i++) {
        if (vars[i].name === val) {
            return i;
        }
    }
    return -1;
};

const excuteExpr = (args: IArgs[], vars: TVars, previous?: any): any => {
    const current: IArgs | undefined = args.shift();

    if (!current) {
        return previous;
    }

    switch (current.type) {
        case 'exp':
            switch (current.va) {
                case '=':
                    return excuteExpr(args, vars, previous);
                default:
                    const value: string | number = excuteExprValue(current.va, previous, excuteExpr(args, vars));
                    return excuteExpr(args, vars, value);
            }
        case 'num':
        case 'str':
            return excuteExpr(args, vars, current.va);
        case 'var':
            let varIndex: number = findVar(current.va, vars);

            if (varIndex === -1) {
                throw new Error('undefined variable exception');
            } else {
                return excuteExpr(args, vars, vars[varIndex].value);
            }
        case 'err':
            throw new Error('unexpect argument exception');
    }

};

const excuteRecursive = (astE: TAst, reE: TExcute, varsE: TVars): TExcute => {
    const ast: TAst = deepCloneArray(astE);
    const re: TExcute = deepCloneArray(reE);
    const vars: TVars = deepCloneArray(varsE);
    const current: IAs | undefined = ast.shift();

    if (!current) {
        return re;
    }

    switch (current.type) {
        case 'assign':
            let varIndex: number = findVar(current.val, vars);
            if (varIndex !== -1) {
                vars[varIndex].value = excuteExpr(current.args, vars);
            } else {
                const currentVar: IVar = {
                    name: current.val,
                    value: excuteExpr(current.args, vars),
                };

                vars.push(currentVar);
            }
            break;
        case 'command':
            if (internalList.indexOf(current.val)) {
                const currentCommand: IExc = {
                    type: 'internal',
                    value: current.val,
                    arg: excuteExpr(current.args, vars),
                };

                re.push(currentCommand);
            }
            break;
    }

    return excuteRecursive(ast, re, vars);
};

const excute = (ast: TAst): TExcute => {
    return excuteRecursive(ast, [], []);
};

export default excute;
