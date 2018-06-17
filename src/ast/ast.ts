/**
 * @fileoverview parse code string to ast tree
 */

import TAst, {
    IArgs,
    IAs,
    TType,
} from '../types/ast';

const parseArg = (arg: string): IArgs => {
    const regExpString: RegExp = /^'([A-Z]|[a-z])([A-Z]|[a-z]|[1-9])*'$/;
    const regExpVariable: RegExp = /^([A-Z]|[a-z])([A-Z]|[a-z]|[1-9])*$/;
    const regExpNumber: RegExp = /^[1-9]+(.[1-9]+)?$/;
    const regExpExpression: RegExp = /^=|\+|-|\*|\/$/;

    if (regExpString.test(arg)) {
        return {
            type: 'str',
            va: arg.substring(1, arg.length - 1),
        };
    } else if (regExpVariable.test(arg)) {
        return {
            type: 'var',
            va: arg,
        };
    } else if (regExpNumber.test(arg)) {
        return {
            type: 'num',
            va: parseFloat(arg),
        };
    } else if (regExpExpression.test(arg)) {
        return {
            type: 'exp',
            va: arg,
        };
    } else {
        return {
            type: 'err',
            va: arg,
        };
    }
};

const ast = (code: string): TAst => {
    const regExpEnter: RegExp = /\r\n|\r|\n/;
    const splited: string[] = code.split(regExpEnter).filter((line: string) => Boolean(line.trim()));
    const vars: string[] = [];

    return splited.map((value: string): IAs => {
        const dots: string[] = value.split(' ').map((dot: string) => dot.trim()).filter((dot: string) => Boolean(dot));
        let command: string = dots.shift() || 'skip';
        let type: TType;

        if (command === 'var') {
            const testShift: string | undefined = dots.shift();

            if (testShift) {
                command = testShift;
                vars.push(command);
            } else {
                command = 'error';
            }

            type = 'assign';
        } else if (vars.indexOf(command) !== -1) {
            type = 'assign';
        } else {
            type = 'command';
        }

        const re: IAs = {
            type,
            val: command,
            args: dots.map(parseArg),
        };

        return re;
    });
};

export default ast;
