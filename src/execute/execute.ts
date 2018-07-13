/**
 * @fileoverview execute target ast with external function
 */

import TAst, { IArgs, IAs } from '../types/ast';
import { IBkcOptions, ICallable, TCallables } from '../types/callable';
import TExecute, { IExc, IVar, TVars } from '../types/execute';
import { fixOption } from '../util/check';
import { deepCloneArray } from '../util/deepclone';
import { error, ERROR_CODE } from './error';
import executeExprValue from './expr';
import { instantList, instants } from './instant';
import { internalList } from './list';

const findVar = (val: string, vars: TVars): number => {
    for (let i: number = 0; i < vars.length; i++) {
        if (vars[i].name === val) {
            return i;
        }
    }
    return -1;
};

const executeExpr = (args: IArgs[], options: IBkcOptions, previous?: any): any => {
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
                    return executeExpr(args, options, previous);
                default:
                    const value: string | number = executeExprValue(current.va, previous, executeExpr(args, options));
                    return executeExpr(args, options, value);
            }
        case 'num':
        case 'str':
            return executeExpr(args, options, current.va);
        case 'arg':
            return current.va.map((value: any): any => {
                return executeExpr([value], options, previous);
            });
        case 'var':
            let instantIndex: number = instantList.indexOf(current.va);
            if (instantIndex !== -1) {
                let result;
                try {
                    result = instants[instantIndex].func(executeExpr(args, options, previous));
                } catch (err) {
                    throw error(ERROR_CODE.INSTANT_FUNCTION_EXECUTE_FAILED);
                }
                return result;
            }

            let externalInstantIndex: number = externalInstants.map((externalInstant: ICallable) => externalInstant.command).indexOf(current.va);
            if (externalInstantIndex !== -1) {
                let result;
                try {
                    result = externalInstants[externalInstantIndex].func(executeExpr(args, options, previous));
                } catch (err) {
                    throw error(ERROR_CODE.INSTANT_EXTERNAL_FUNCTION_EXECUTE_FAILED);
                }
                return result;
            }

            let varIndex: number = findVar(current.va, vars);

            if (varIndex === -1) {
                throw error(ERROR_CODE.UNDEFINED_VARIABLE);
            } else {
                return executeExpr(args, options, vars[varIndex].value);
            }
        case 'emp':
            return executeExpr(args, options, previous);
        case 'err':
            throw error(ERROR_CODE.UNEXPECTED_ARGUMENT);
    }

};

const executeRecursive = (astE: TAst, reE: TExecute, options: IBkcOptions): TExecute => {
    const ast: TAst = deepCloneArray(astE);
    const re: TExecute = deepCloneArray(reE);
    const current: IAs | undefined = ast.shift();

    const vars: IVar[] = (options.vars as IVar[]);

    if (!current) {
        return re;
    }

    loop: switch (current.type) {
        case 'if':

            if (!Boolean(executeExpr(current.args, options))) {
                for (let i of ast) {
                    if (i.type !== 'end') {
                        i.type = 'skip';
                    } else {
                        break loop;
                    }
                }
                throw error(ERROR_CODE.STATEMENT_END_NOT_MATCHED);
            }
            break;
        case 'for':
            throw error(ERROR_CODE.FOR_LOOP_IS_NOT_AVAILABLE);
        case 'assign':

            let varIndex: number = findVar(current.val, vars);
            if (varIndex !== -1) {
                vars[varIndex].value = executeExpr(current.args, options);
            } else {
                const currentVar: IVar = {
                    name: current.val,
                    value: executeExpr(current.args, options),
                };

                vars.push(currentVar);
            }
            break;
        case 'command':
            if (internalList.indexOf(current.val)) {
                const currentCommand: IExc = {
                    type: 'internal',
                    value: current.val,
                    arg: executeExpr(current.args, options),
                };

                re.push(currentCommand);
            }

            break;
        case 'error':
            throw error(ERROR_CODE.NAMESPACE_UNAVAILABLE);
        case 'skip':
        default:
            break;
    }

    return executeRecursive(ast, re, options);
};

const execute = (ast: TAst, optionsE: IBkcOptions): TExecute => {
    const options: IBkcOptions = fixOption(optionsE);
    return executeRecursive(ast, [], options);
};

export default execute;
