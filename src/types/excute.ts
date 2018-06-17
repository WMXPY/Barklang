/**
 * @fileoverview excute type interface
 */

export type TExcuteType = 'external' | 'internal' | 'return';
export type TVarType = 'string' | 'number';

export interface IExc {
    type: TExcuteType;
    value: string;
    arg: any;
}

export interface IVar {
    name: string;
    type?: TVarType;
    value: any;
}

type TExcute = IExc[];
export type TVars = IVar[];

export default TExcute;
