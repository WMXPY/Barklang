/**
 * @fileoverview test code execute
 */

import { expect } from 'chai';
import execute from '../../src/execute/execute';
import TAst, { EXPRESSION } from '../../src/types/ast';
import TExecute from '../../src/types/execute';


describe('test executed result accessible', (): void => {

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
        const result: TExecute = [{
            type: 'internal',
            value: 'return',
            arg: 1,
        }];

        expect(execute(ast, {})).to.be.deep.equal(result);
    });

});

describe('test execute code', (): void => {

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

        const result: TExecute = [{
            type: 'internal',
            value: 'return',
            arg: 3,
        }];

        expect(execute(ast, {})).to.be.deep.equal(result);
    });

    it('test expr execute', (): void => {
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
                        va: EXPRESSION.PLUS,
                    },
                    {
                        type: 'str',
                        va: 'test',
                    },
                ],
            },
        ];

        const result: TExecute = [{
            type: 'internal',
            value: 'return',
            arg: '4test',
        }];

        expect(execute(ast, {})).to.be.deep.equal(result);
    });

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

        const result: TExecute = [{
            type: 'internal',
            value: 'return',
            arg: 3,
        }];

        expect(execute(ast, {})).to.be.deep.equal(result);
    });

    it('unexpected argument exception should throw when face err type', (): void => {
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
                        va: EXPRESSION.PLUS,
                    },
                    {
                        type: 'err',
                        va: 'err',
                    },
                ],
            },
        ];
        expect(execute.bind(execute, ast, {})).to.be.throw('unexpected argument exception');
    });

    it('External instant function execute failed throw when external throw error', (): void => {
        const ast: TAst = [
            {
                val: 'return',
                type: 'command',
                args: [
                    {
                        type: 'var',
                        va: 'test',
                    },
                    {
                        type: 'exp',
                        va: EXPRESSION.PLUS,
                    },
                    {
                        type: 'err',
                        va: 'err',
                    },
                ],
            },
        ];
        expect(execute.bind(execute, ast, {
            instants: [{
                command: 'test',
                func: () => {
                    throw new Error('any');
                },
            }],
        })).to.be.throw('102: Instant instant function execute failed');
    });

    it('for loop should not be called yet', (): void => {
        const ast: TAst = [
            {
                val: 'return',
                type: 'for',
                args: [
                    {
                        type: 'str',
                        va: 'for',
                    },
                    {
                        type: 'exp',
                        va: EXPRESSION.PLUS,
                    },
                    {
                        type: 'err',
                        va: 'err',
                    },
                ],
            },
        ];
        expect(execute.bind(execute, ast, {})).to.be.throw('for loop is not developed yet');
    });

    it('test complex execute', (): void => {
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
                        va: EXPRESSION.PLUS,
                    },
                    {
                        type: 'str',
                        va: 'test',
                    },
                    {
                        type: 'exp',
                        va: EXPRESSION.PLUS,
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

        const result: TExecute = [{
            type: 'internal',
            value: 'return',
            arg: '4test32',
        }];

        expect(execute(ast, {})).to.be.deep.equal(result);
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
                        va: EXPRESSION.PLUS,
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
                        va: EXPRESSION.PLUS,
                    },
                    {
                        type: 'str',
                        va: 'test',
                    },
                    {
                        type: 'exp',
                        va: EXPRESSION.PLUS,
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

        const result: TExecute = [{
            type: 'internal',
            value: 'return',
            arg: '4test56',
        }];

        expect(execute(ast, {})).to.be.deep.equal(result);
    });

});
