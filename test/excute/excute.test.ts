/**
 * @fileoverview test code excute
 */

import { expect } from 'chai';

import excute from '../../src/excute/excute';
import TAst from '../../src/types/ast';
import TExcute from '../../src/types/excute';

describe('test excuted result accessiable', (): void => {

    it('test variable assign', (): void => {
        const ast: TAst = [
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
        ];
        const result: TExcute = [{
            type: 'internal',
            value: 'return',
            arg: 1,
        }];

        expect(excute(ast, {})).to.be.deep.equal(result);
    });

});

describe('test excute code', (): void => {

    it('test variable assign', (): void => {
        const ast: TAst = [
            {
                val: 'a',
                type: 'assign',
                args: [
                    {
                        type: 'num',
                        va: 3,
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

        const result: TExcute = [{
            type: 'internal',
            value: 'return',
            arg: 3,
        }];

        expect(excute(ast, {})).to.be.deep.equal(result);
    });

    it('test expr excute', (): void => {
        const ast: TAst = [
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'num',
                        va: 4,
                    },
                    {
                        type: 'exp',
                        va: '+',
                    },
                    {
                        type: 'str',
                        va: 'test',
                    },
                ],
            },
        ];

        const result: TExcute = [{
            type: 'internal',
            value: 'return',
            arg: '4test',
        }];

        expect(excute(ast, {})).to.be.deep.equal(result);
    });

    it('test complex excute', (): void => {
        const ast: TAst = [
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'num',
                        va: 4,
                    },
                    {
                        type: 'exp',
                        va: '+',
                    },
                    {
                        type: 'str',
                        va: 'test',
                    },
                    {
                        type: 'exp',
                        va: '+',
                    },
                    {
                        type: 'str',
                        va: 4,
                    },
                    {
                        type: 'exp',
                        va: '*',
                    },
                    {
                        type: 'str',
                        va: 8,
                    },
                ],
            },
        ];

        const result: TExcute = [{
            type: 'internal',
            value: 'return',
            arg: '4test32',
        }];

        expect(excute(ast, {})).to.be.deep.equal(result);
    });

    it('test variable assign and recall', (): void => {
        const ast: TAst = [
            {
                val: 'a',
                type: 'assign',
                args: [
                    {
                        type: 'num',
                        va: 3,
                    },
                ],
            },
            {
                val: 'a',
                type: 'assign',
                args: [
                    {
                        type: 'num',
                        va: 4,
                    },
                    {
                        type: 'exp',
                        va: '+',
                    },
                    {
                        type: 'var',
                        va: 'a',
                    },
                ],
            },
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'num',
                        va: 4,
                    },
                    {
                        type: 'exp',
                        va: '+',
                    },
                    {
                        type: 'str',
                        va: 'test',
                    },
                    {
                        type: 'exp',
                        va: '+',
                    },
                    {
                        type: 'var',
                        va: 'a',
                    },
                    {
                        type: 'exp',
                        va: '*',
                    },
                    {
                        type: 'str',
                        va: 8,
                    },
                ],
            },
        ];

        const result: TExcute = [{
            type: 'internal',
            value: 'return',
            arg: '4test56',
        }];

        expect(excute(ast, {})).to.be.deep.equal(result);
    });

});
