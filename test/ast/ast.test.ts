/**
 * @fileoverview test ast generate
 */

import { expect } from 'chai';

import ast from '../../src/ast/ast';
import TAst from '../../src/types/ast';

describe('test AST generater', (): void => {

    let testCode: string;

    beforeEach(() => {
        testCode = '\
            var a 1\r\n\
            a = \'test\'\n\
            a = 3\r\
            return a\r\
        ';
    });

    it('test simple code parse', (): void => {
        const testAST: TAst = ast(testCode);
        const expectedAST: TAst = [
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
                val: 'a',
                type: 'assign',
                args: [
                    {
                        type: 'exp',
                        va: '=',
                    },
                    {
                        type: 'str',
                        va: 'test',
                    },
                ],
            },
            {
                val: 'a',
                type: 'assign',
                args: [
                    {
                        type: 'exp',
                        va: '=',
                    },
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
        expect(testAST).to.be.deep.equal(expectedAST);
    });

    it('test simple code parse', (): void => {
        testCode = '\
            var _a 1\r\n\
            _a = \'test\'\n\
            _a = 3\r\
            return _a\r\
        ';
        const testAST: TAst = ast(testCode);
        const expectedAST: TAst = [
            {
                val: '_a',
                type: 'assign',
                args: [
                    {
                        type: 'num',
                        va: 1,
                    },
                ],
            },
            {
                val: '_a',
                type: 'assign',
                args: [
                    {
                        type: 'exp',
                        va: '=',
                    },
                    {
                        type: 'str',
                        va: 'test',
                    },
                ],
            },
            {
                val: '_a',
                type: 'assign',
                args: [
                    {
                        type: 'exp',
                        va: '=',
                    },
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
                        va: '_a',
                    },
                ],
            },
        ];
        expect(testAST).to.be.deep.equal(expectedAST);
    });

});
