/**
 * @fileoverview excute target ast with external function
 */

import { deepCloneArray } from "../util/deepclone";
import excuteExprValue from './expr';

import { internalList } from "./list";

import TAst, { IArgs, IAs } from "../types/ast";
import { IBkcOptions, ICallable, TCallables } from "../types/callable";
import TExcute, { IExc, IVar, TVars } from "../types/excute";
import { fixOption } from "../util/check";
import { instantList, instants } from "./instant";

const findVar = (val: string, vars: TVars): number => {
    for (let i: number = 0; i < vars.length; i++) {
        if (vars[i].name === val) {
            return i;
        }
    }
    return -1;
};

const excuteExpr = (args: IArgs[], options: IBkcOptions, previous?: any): any => {
    const current: IArgs | undefined = args.shift();

    const vars: TVars = (options.vars as TVars);
    const externalInstants: TCallables = (options.instants as TCallables);

    if (!current) {
        return previous;
    }

    switch (current.type) {
        case 'exp':
            switch (current.va) {
                case '=':
                    return excuteExpr(args, options, previous);
                default:
                    const value: string | number = excuteExprValue(current.va, previous, excuteExpr(args, options));
                    return excuteExpr(args, options, value);
            }
        case 'num':
        case 'str':
            return excuteExpr(args, options, current.va);
        case 'arg':
            return current.va.map((value: any): any => {
                return excuteExpr([value], options, previous);
            });
        case 'var':
            let instantIndex: number = instantList.indexOf(current.va);
            if (instantIndex !== -1) {
                let result;
                try {
                    result = instants[instantIndex].func(excuteExpr(args, options, previous));
                } catch (err) {
                    throw new Error('instant function excute failed');
                }
                return result;
            }

            let externalInstantIndex: number = externalInstants.map((externalInstant: ICallable) => externalInstant.command).indexOf(current.va);
            if (externalInstantIndex !== -1) {
                let result;
                try {
                    result = externalInstants[externalInstantIndex].func(excuteExpr(args, options, previous));
                } catch (err) {
                    throw new Error('external instant function excute failed');
                }
                return result;
            }

            let varIndex: number = findVar(current.va, vars);

            if (varIndex === -1) {
                throw new Error('undefined variable exception');
            } else {
                return excuteExpr(args, options, vars[varIndex].value);
            }
        case 'emp':
            return excuteExpr(args, options, previous);
        case 'err':
            throw new Error('unexpect argument exception');
    }

};

const excuteRecursive = (astE: TAst, reE: TExcute, options: IBkcOptions): TExcute => {
    const ast: TAst = deepCloneArray(astE);
    const re: TExcute = deepCloneArray(reE);
    const current: IAs | undefined = ast.shift();

    const vars: IVar[] = (options.vars as IVar[]);

    if (!current) {
        return re;
    }

    loop: switch (current.type) {
        case 'if':

            if (!Boolean(excuteExpr(current.args, options))) {
                for (let i of ast) {
                    if (i.type !== 'end') {
                        i.type = 'skip';
                    } else {
                        break loop;
                    }
                }
                throw new Error('end command not matched exception');
            }
            break;
        case 'for':
            throw new Error('for loop is not developed yet');
        case 'assign':

            let varIndex: number = findVar(current.val, vars);
            if (varIndex !== -1) {
                vars[varIndex].value = excuteExpr(current.args, options);
            } else {
                const currentVar: IVar = {
                    name: current.val,
                    value: excuteExpr(current.args, options),
                };

                vars.push(currentVar);
            }
            break;
        case 'command':
            if (internalList.indexOf(current.val)) {
                const currentCommand: IExc = {
                    type: 'internal',
                    value: current.val,
                    arg: excuteExpr(current.args, options),
                };

                re.push(currentCommand);
            }

            break;
        case 'error':
            throw new Error('unexpect namespace exception');
        case 'skip':
        default:
            break;
    }

    return excuteRecursive(ast, re, options);
};

const excute = (ast: TAst, optionsE: IBkcOptions): TExcute => {
    const options: IBkcOptions = fixOption(optionsE);
    return excuteRecursive(ast, [], options);
};

export default excute;
