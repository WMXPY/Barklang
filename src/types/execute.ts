/**
 * @fileoverview execute type interface
 */

export type TExecuteType = 'external' | 'internal' | 'return';
export type TVarType = 'string' | 'number';

export interface IExc {
    type: TExecuteType;
    value: string;
    arg: any;
}

export interface IVar {
    name: string;
    type?: TVarType;
    value: any;
}

type TExecute = IExc[];
export type TVars = IVar[];

export default TExecute;
