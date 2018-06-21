/**
 * @fileoverview test ast generate
 */

import { expect } from 'chai';

import ast from '../../src/ast/ast';
import TAst from '../../src/types/ast';

describe('test AST generater use reserved word', (): void => {

    let testCode: string;

    beforeEach(() => {
        testCode = '\
            var len 1\r\n\
        ';
    });

    it('test assign var name as reserved word', (): void => {
        const testAST: TAst = ast(testCode);
        const expectedAST: TAst = [
            {
                val: 'len',
                type: 'error',
                args: [
                    {
                        type: 'num',
                        va: 1,
                    },
                ],
            },
        ];
        expect(testAST).to.be.deep.equal(expectedAST);
    });

});
