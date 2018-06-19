import { TCallables } from "../types/callable";

export const instants: TCallables = [
    {
        command: 'len',
        func: (value: string): number => {
            return value.length;
        },
    },
];


export const instantList: string[] = [
    'len',
];
