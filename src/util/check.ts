/**
 * @fileoverview check namespace
 */

import { internalList } from "../excute/list";
import { IBkcOptions } from "../types/callable";
import { deepCloneObject } from "../util/deepclone";

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

    return options;
};

export const checkNamespace = (name: string): boolean => {
    return internalList.indexOf(name) !== -1;
};
