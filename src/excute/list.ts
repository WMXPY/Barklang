import { TCallables } from "../types/callable";

export const internalList: string[] = [
    'print',
    'return',
    'warn',
];

export const reservedWordList: string[] = [
    'var',
];

export const internals: TCallables = [
    {
        command: 'print',
        func: (value: any): 0 => {
            console.log(value);
            return 0;
        },
    },
    {
        command: 'warn',
        func: (value: any): 0 => {
            console.warn(value);
            return 0;
        },
    },
];
