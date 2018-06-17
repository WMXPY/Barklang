import TCallables from "../types/callable";

export const internalList: string[] = [
    'print',
    'return',
];

export const internals: TCallables = [
    {
        command: 'print',
        func: (value: any) => {
            console.log(value);
        },
    },
];

