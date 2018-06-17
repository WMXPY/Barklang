/**
 * @fileoverview excute type interface
 */

export type TExcuteType = 'external' | 'internal' | 'return';

export interface IExc {
    type: TExcuteType;
    args: string[];
}

type TExcute = IExc[];

export default TExcute;
