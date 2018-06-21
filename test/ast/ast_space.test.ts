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

});
