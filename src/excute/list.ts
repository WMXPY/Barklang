import { TCallables } from "../types/callable";

export const internalList: string[] = [
    'print',
    'return',
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
];
