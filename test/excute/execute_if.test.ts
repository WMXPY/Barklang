/**
 * @fileoverview test code execute with if statement
 */

import { expect } from 'chai';

import execute from '../../src/execute/execute';
import TAst from '../../src/types/ast';
import TExecute from '../../src/types/execute';

describe('test executed result accessible with if statement', (): void => {

    it('test if return true', (): void => {
        const ast: TAst = [
            {
                val: 'if',
                type: 'if',
                args: [
                    {
                        type: 'num',
                        va: 1,
                    },
                ],
            },
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'num',
                        va: 1,
                    },
                ],
            },
            {
                val: 'end',
                type: 'end',
                args: [],
            },
        ];
        const result: TExecute = [{
            type: 'internal',
            value: 'return',
            arg: 1,
        }];

        expect(execute(ast, {})).to.be.deep.equal(result);
    });

    it('test if return false', (): void => {
        const ast: TAst = [
            {
                val: 'if',
                type: 'if',
                args: [
                    {
                        type: 'num',
                        va: 0,
                    },
                ],
            },
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'num',
                        va: 1,
                    },
                ],
            },
            {
                val: 'end',
                type: 'end',
                args: [],
            },
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'num',
                        va: 9,
                    },
                ],
            },
        ];
        const result: TExecute = [{
            type: 'internal',
            value: 'return',
            arg: 9,
        }];

        expect(execute(ast, {})).to.be.deep.equal(result);
    });

    it('test if return error', (): void => {
        const ast: TAst = [
            {
                val: 'if',
                type: 'if',
                args: [
                    {
                        type: 'num',
                        va: 0,
                    },
                ],
            },
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'num',
                        va: 1,
                    },
                ],
            },
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'num',
                        va: 9,
                    },
                ],
            },
        ];

        expect(execute.bind(execute, ast)).to.be.throw('end command not matched exception');
    });

    it('test if var assign', (): void => {
        const ast: TAst = [
            {
                val: 'if',
                type: 'if',
                args: [
                    {
                        type: 'num',
                        va: 0,
                    },
                ],
            },
            {
                val: 'a',
                type: 'assign',
                args: [
                    {
                        type: 'num',
                        va: 1,
                    },
                ],
            },
            {
                val: 'end',
                type: 'end',
                args: [],
            },
            {
                val: 'a',
                type: 'assign',
                args: [
                    {
                        type: 'num',
                        va: 7,
                    },
                ],
            },
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'var',
                        va: 'a',
                    },
                ],
            },
        ];

        const result: TExecute = [{
            type: 'internal',
            value: 'return',
            arg: 7,
        }];

        expect(execute(ast, {})).to.be.deep.equal(result);
    });

});
