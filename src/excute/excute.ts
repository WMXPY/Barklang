/**
 * @fileoverview excute target ast with external function
 */

import TAst, { IAs } from "../types/ast";
import TExcute, { IExc } from "../types/excute";

const deepCloneArray: <T>(content: T[]) => T[] = (content) => {
    return [...content];
};

const deepCloneObject: <T>(content: { [key: string]: T }) => { [key: string]: T } = (content) => {
    return Object.assign({}, content);
};

const excuteRecursive = (astE: TAst, reE: TExcute): TExcute => {
    const ast: TAst = deepCloneArray(astE);
    const re: TExcute = deepCloneArray(reE);
    const current: IAs | undefined = ast.shift();
    if (!Boolean(current)) {
        return re;
    }

    return excuteRecursive(ast, re);
};

const excute = (ast: TAst): TExcute => {
    const re: TExcute = [];
    return excuteRecursive(ast, re);
};

export default excute;
