/**
 * @author WMXPY
 * @fileoverview Instant function executer
 */

import { ICallable, TCallables } from '../types/callable';
import { deepCloneArray } from '../util/deepclone';
import { error, ERROR_CODE } from './error';

export enum INSTANT_COMMANDS {
    LENGTH = 'len',
    ARRAY = 'array',
    PUSH = 'push',
    UNSHIFT = 'unshift',
    GET = 'get',
    FIRST_ELEMENT = 'car',
    REST_ELEMENT = 'cdr',
    SUM = 'sum',
}

export const instants: TCallables = [
    {
        command: INSTANT_COMMANDS.LENGTH,
        func: (value: string): number => {
            if (value.length) {
                return value.length;
            }
            throw error(ERROR_CODE.INSTANT_FUNCTION_EXECUTE_FAILED);
        },
    },
    {
        command: INSTANT_COMMANDS.ARRAY,
        func: <T>(): T[] => {
            return [];
        },
    },
    {
        command: INSTANT_COMMANDS.PUSH,
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
        command: INSTANT_COMMANDS.UNSHIFT,
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
        command: INSTANT_COMMANDS.GET,
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
        command: INSTANT_COMMANDS.FIRST_ELEMENT,
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
        command: INSTANT_COMMANDS.REST_ELEMENT,
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
        command: INSTANT_COMMANDS.SUM,
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
