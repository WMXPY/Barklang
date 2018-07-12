/**
 * @fileoverview test expression execute
 */

import { expect } from 'chai';

import executeExpr from '../../src/execute/expr';

describe('test expression execution - number compares', (): void => {

    it('test execute compression result (>)', (): void => {
        const test = executeExpr('>', 5, 4);
        const result = 1;
        expect(test).to.be.equal(result);
        const test2 = executeExpr('>', 1.22, 4);
        const result2 = 0;
        expect(test2).to.be.equal(result2);
    });

    it('test execute compression result (<)', (): void => {
        const test = executeExpr('<', 5, 4);
        const result = 0;
        expect(test).to.be.equal(result);
        const test2 = executeExpr('<', 1.22, 4);
        const result2 = 1;
        expect(test2).to.be.equal(result2);
    });

    it('test execute compression result (>=)', (): void => {
        const test = executeExpr('>=', 4, 4);
        const result = 1;
        expect(test).to.be.equal(result);
        const test2 = executeExpr('>=', 1.22, 1);
        const result2 = 1;
        expect(test2).to.be.equal(result2);
    });

    it('test execute compression result (<=)', (): void => {
        const test = executeExpr('<=', 4, 4);
        const result = 1;
        expect(test).to.be.equal(result);
        const test2 = executeExpr('<=', 1.22, 1);
        const result2 = 0;
        expect(test2).to.be.equal(result2);
    });

    it('test execute compression result (==)', (): void => {
        const test = executeExpr('==', 4, 4);
        const result = 1;
        expect(test).to.be.equal(result);
        const test2 = executeExpr('==', 1.22, 4);
        const result2 = 0;
        expect(test2).to.be.equal(result2);
    });

});
