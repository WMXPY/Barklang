/**
 * @fileoverview parse code string to ast tree
 */

import TAst, { IAs } from '../types/ast';

const ast = (code: string): TAst => {
    const splited = code.split(/\r\n|\r|\n/).filter((line: string) => Boolean(line.trim()));
    return splited.map((value: string): IAs => {
        const dots: string[] = value.split(' ').map((dot: string) => dot.trim()).filter((dot: string) => Boolean(dot));
        const command: string = dots.shift() || 'skip';
        return {
            type: 'assign',
            command,
            args: dots,
        };
    });
};

export default ast;
