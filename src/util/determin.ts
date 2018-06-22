/**
 * @fileoverview ditermin functions
 */

import { internalList, internals } from "../excute/list";
import { TCallables } from "../types/callable";


export const findExternal = (val: string, externals: TCallables): number => {
    for (let i: number = 0; i < externals.length; i++) {
        if (externals[i].command === val) {
            return i;
        }
    }
    return -1;
};

export const determinReturn = (command: string): boolean => {
    if (command === 'return') {
        return true;
    }
    return false;
};


export const determin = (command: string, externals: TCallables): ((arg: any) => void) | null => {
    const internalIndex: number = internalList.indexOf(command);
    const externalIndex: number = findExternal(command, externals);

    if (internalIndex !== -1) {
        return internals[internalIndex].func;
    }

    if (externalIndex !== -1) {
        return externals[externalIndex].func;
    }

    return null;
};
