/**
 * @fileoverview test ast generate
 */

import { expect } from 'chai';

import ast from '../../src/ast/ast';
import TAst from '../../src/types/ast';

describe('test AST generater (spaces)', (): void => {

    it('test string with space parse', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = \'t e s  t\'\n\
            a = 3\r\
            return a\r\
        ';
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
                        va: 't e s  t',
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

    it('test string with space parse with skip', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = \'t e s  t\'\n\
            skip \r\
            a = 3\r\
            return a\r\
        ';
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
                        va: 't e s  t',
                    },
                ],
            },
            {
                val: 'skip',
                type: 'skip',
                args: [],
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

    it('test string with space parse with skip', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = \'t e s  t\'\n\
            # Hello world \r\
            a = 3\r\
            return a\r\
        ';
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
                        va: 't e s  t',
                    },
                ],
            },
            {
                val: 'skip',
                type: 'skip',
                args: [],
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
        const testCode = '\
            var a 1\r\n\
            a = \'test\'\n\
            a  = 3\r\
            return a\r\
        ';
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
                        type: 'emp',
                        va: '',
                    },
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

    it('test parse to error expr', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = \'test\'\n\
            a  = &&3\r\
            return a\r\
        ';
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
                        type: 'emp',
                        va: '',
                    },
                    {
                        type: 'exp',
                        va: '=',
                    },
                    {
                        type: 'err',
                        va: '&&3',
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

    it('test parse skip long expression', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = \'test\'\n\
            skip\n\
            a  = 3\r\
            return a\r\
        ';
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
                val: 'skip',
                type: 'skip',
                args: [],
            },
            {
                val: 'a',
                type: 'assign',
                args: [
                    {
                        type: 'emp',
                        va: '',
                    },
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

    it('test parse for long expression', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = \'test\'\n\
            for\n\
            a  = 3\r\
            return a\r\
        ';
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
                val: 'for',
                type: 'for',
                args: [],
            },
            {
                val: 'a',
                type: 'assign',
                args: [
                    {
                        type: 'emp',
                        va: '',
                    },
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

    it('test combine failed exception', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = \'te _*&* st\'\n\
            a  = 3\r\
            return a\r\
        ';
        expect(ast.bind(ast, testCode)).to.be.throw('combine failed exception');
    });

    it('test number is NOT trigger combine failed exception', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = \'te 123 st\'\n\
            a  = 3\r\
            return a\r\
        ';
        expect(ast.bind(ast, testCode)).to.be.not.throw('combine failed exception');
    });

});
