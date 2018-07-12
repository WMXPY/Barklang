/**
 * @author WMXPY
 * @fileoverview Instant function executer
 */

import { ICallable, TCallables } from '../types/callable';
import { deepCloneArray } from '../util/deepclone';
import { error, ERROR_CODE } from './error';

export const instants: TCallables = [
    {
        command: 'len',
        func: (value: string): number => {
            if (value.length) {
                return value.length;
            }
            throw error(ERROR_CODE.INSTANT_FUNCTION_EXECUTE_FAILED);
        },
    },
    {
        command: 'array',
        func: <T>(): T[] => {
            return [];
        },
    },
    {
        command: 'push',
        func: <T>(arg: {
            0: T[];
            1: T;
        }): T[] => {
            if (typeof arg[0] === 'object' && arg[0].length >= 0) {
                const arr = deepCloneArray(arg[0]);
                arr.push(arg[1]);
                return arr;
            }
            throw error(ERROR_CODE.INSTANT_FUNCTION_EXECUTE_FAILED);
        },
    },
    {
        command: 'unshift',
        func: <T>(arg: {
            0: T[];
            1: T;
        }): T[] => {
            if (typeof arg[0] === 'object' && arg[0].length >= 0) {
                const arr = deepCloneArray(arg[0]);
                arr.unshift(arg[1]);
                return arr;
            }
            throw error(ERROR_CODE.INSTANT_FUNCTION_EXECUTE_FAILED);
        },
    },
    {
        command: 'get',
        func: <T>(arg: {
            0: T[];
            1: number;
        } | {
            0: { [key: string]: T },
            1: string;
        }): T => {
            try {
                if (typeof arg[1] === 'number') {
                    return (arg[0] as T[])[(arg[1] as number)];
                } else {
                    return (arg[0] as { [key: string]: T })[(arg[1] as string)];
                }
            } catch (err) {
                throw error(ERROR_CODE.INSTANT_FUNCTION_EXECUTE_FAILED);
            }
        },
    },
    {
        command: 'car',
        func: <T>(value: T[]): T => {
            if (typeof value === 'object') {
                if (value[0]) {
                    return value[0];
                }
            }
            throw error(ERROR_CODE.INSTANT_FUNCTION_EXECUTE_FAILED);
        },
    },
    {
        command: 'cdr',
        func: <T>(value: T[]): T[] => {
            if (typeof value === 'object' && value.length > 0) {
                const arr = deepCloneArray(value);
                arr.shift();
                return arr;
            }
            throw error(ERROR_CODE.INSTANT_FUNCTION_EXECUTE_FAILED);
        },
    },
    {
        command: 'sum',
        func: (value: number[]): number => {
            let count = 0;
            for (let i of value) {
                count += i;
            }
            return count;
        },
    },
];


export const instantList: string[] = instants.map((value: ICallable) => value.command);
