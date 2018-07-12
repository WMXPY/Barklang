/**
 * @fileoverview check namespace
 */

import { instantList } from '../execute/instant';
import { internalList, reservedWordList } from '../execute/list';
import { IBkcOptions, ICallable, INamespaceResponse, TCallables, TNamespaceResponse } from '../types/callable';
import { IVar, TVars } from '../types/execute';
import { deepCloneObject } from './deepclone';

export const checkOptionNameSpace = (options: IBkcOptions): TNamespaceResponse => {
    const vars: TVars = (options.vars as TVars);
    const externals: TCallables = (options.externals as TCallables);
    const externalInstants: TCallables = (options.instants as TCallables);

    const re: TNamespaceResponse = [];

    const usedNameSpaces: TNamespaceResponse = vars.map((value: IVar): INamespaceResponse => {
        return {
            name: value.name,
            category: 'var',
        };
    }).concat((externals.map((value: ICallable): INamespaceResponse => {
        return {
            name: value.command,
            category: 'external',
        };
    }))).concat((externalInstants.map((value: ICallable): INamespaceResponse => {
        return {
            name: value.command,
            category: 'instant',
        };
    })));

    for (let i of usedNameSpaces) {
        if (instantList.indexOf(i.name) !== -1
            || internalList.indexOf(i.name) !== -1
            || reservedWordList.indexOf(i.name) !== -1) {
            re.push(i);
        }
    }

    return re;
};

export const fixOption = (optionsE: IBkcOptions | undefined) => {
    let options: IBkcOptions;
    if (optionsE) {
        options = deepCloneObject(optionsE);
    } else {
        options = {};
    }

    if (!options) {
        options = {};
    }

    if (!options.externals) {
        options.externals = [];
    }

    if (!options.vars) {
        options.vars = [];
    }

    if (!options.instants) {
        options.instants = [];
    }

    return options;
};

export const checkNamespace = (name: string): boolean => {
    return internalList.indexOf(name) !== -1;
};
