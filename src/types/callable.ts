/**
 * @fileoverview excute type interface
 */

export interface ICallable {
    command: string;
    func: (arg?: any) => void;
}

export interface IExternalVar {
    name: string;
    value: string | number;
}

export type TCallables = ICallable[];
export type TExteralVars = IExternalVar[];


export interface IBkcOptions {
    externals?: TCallables;
    vars?: TExteralVars;
}

export default IBkcOptions;
