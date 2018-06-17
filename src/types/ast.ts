/**
 * @fileoverview ast type interface
 */

export interface IAs {
    type: 'external' | 'assign';
    command: string;
    args: string[];
}

type TAst = IAs[];

export default TAst;
