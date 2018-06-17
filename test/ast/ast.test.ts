import { expect } from 'chai';

import ast from '../../src/ast/ast';
import TAst from '../../src/types/ast';

describe('test AST generater', (): void => {

    let testCode: string;

    beforeEach(() => {
        testCode = '\
            var a 1\
            return a\
        ';
    });

    it('init', (): void => {
        const testAST: TAst = ast(testCode);
        expect(testCode).to.be.equal(testCode);
    });

});
