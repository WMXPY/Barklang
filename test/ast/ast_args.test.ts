/**
 * @fileoverview test ast generate
 */

import { expect } from 'chai';

import ast from '../../src/ast/ast';
import TAst from '../../src/types/ast';

describe('test AST generater with args', (): void => {

    it('test args code AST parse', (): void => {
        const testCode = '\
            return sum 1,5,6\r\
        ';
        const testAST: TAst = ast(testCode);
        const expectedAST: TAst = [
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
        expect(testAST).to.be.deep.equal(expectedAST);
    });

    it('test args code with string AST parse', (): void => {
        const testCode = '\
            return sum "1q123",5,6\r\
        ';
        const testAST: TAst = ast(testCode);
        const expectedAST: TAst = [
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
                                type: "str",
                                va: "1q123",
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
        expect(testAST).to.be.deep.equal(expectedAST);
    });
});
