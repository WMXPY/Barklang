/**
 * @fileoverview test code excute
 */

import { expect } from 'chai';

import excute from '../../src/excute/excute';
import TAst from '../../src/types/ast';
import TExcute from '../../src/types/excute';

describe('test excuted result with initial vars', (): void => {

    it('test variable assign', (): void => {
        const ast: TAst = [
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'var',
                        va: 'tt',
                    },
                ],
            },
        ];
        const result: TExcute = [{
            type: 'internal',
            value: 'return',
            arg: 45,
        }];

        expect(excute(ast, {
            vars: [{
                name: 'tt',
                value: 45,
            }],
        })).to.be.deep.equal(result);
    });

    it('test variable assign complex', (): void => {
        const ast: TAst = [
            {
                val: 'ff',
                type: 'assign',
                args: [
                    {
                        type: 'num',
                        va: 32,
                    },
                ],
            },
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'var',
                        va: 'tt',
                    },
                    {
                        type: 'exp',
                        va: '+',
                    },
                    {
                        type: 'var',
                        va: 'ff',
                    },
                    {
                        type: 'exp',
                        va: '+',
                    },
                    {
                        type: 'num',
                        va: 9,
                    },
                ],
            },
        ];
        const result: TExcute = [{
            type: 'internal',
            value: 'return',
            arg: 86,
        }];

        expect(excute(ast, {
            vars: [{
                name: 'tt',
                value: 45,
            }],
        })).to.be.deep.equal(result);
    });

    it('test ast excute with args', (): void => {
        const ast: TAst = [
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'var',
                        va: 'sum',
                    },
                    {
                        type: 'arg',
                        va: [
                            {
                                type: "num",
                                va: 1,
                            },
                            {
                                type: "num",
                                va: 5,
                            },
                            {
                                type: "num",
                                va: 6,
                            },
                        ],
                    },
                ],
            },
        ];
        const result: TExcute = [{
            type: 'internal',
            value: 'return',
            arg: 12,
        }];

        expect(excute(ast, {})).to.be.deep.equal(result);
    });

});
