/**
 * @fileoverview test code execute
 */

import { expect } from 'chai';
import execute from '../../src/execute/execute';
import TAst, { EXPRESSION } from '../../src/types/ast';
import TExecute from '../../src/types/execute';


describe('test executed result with initial vars', (): void => {

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
        const result: TExecute = [{
            type: 'internal',
            value: 'return',
            arg: 45,
        }];

        expect(execute(ast, {
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
                        va: EXPRESSION.PLUS,
                    },
                    {
                        type: 'var',
                        va: 'ff',
                    },
                    {
                        type: 'exp',
                        va: EXPRESSION.PLUS,
                    },
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
            arg: 86,
        }];

        expect(execute(ast, {
            vars: [{
                name: 'tt',
                value: 45,
            }],
        })).to.be.deep.equal(result);
    });

    it('test ast execute with args', (): void => {
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
                                type: 'num',
                                va: 1,
                            },
                            {
                                type: 'num',
                                va: 5,
                            },
                            {
                                type: 'num',
                                va: 6,
                            },
                        ],
                    },
                ],
            },
        ];
        const result: TExecute = [{
            type: 'internal',
            value: 'return',
            arg: 12,
        }];

        expect(execute(ast, {})).to.be.deep.equal(result);
    });

});
