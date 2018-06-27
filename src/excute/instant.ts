import { ICallable, TCallables } from "../types/callable";
import { error } from "./error";

export const instants: TCallables = [
    {
        command: 'len',
        func: (value: string): number => {
            if (value.length) {
                return value.length;
            }
            throw error(101);
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
            throw error(101);
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
