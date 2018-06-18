/**
 * @fileoverview test expression excute
 */

import { expect } from 'chai';

import excuteExpr from '../../src/excute/expr';

describe('test expression excution - number compares', (): void => {

    it('test excute comparesion result (>)', (): void => {
        const test = excuteExpr('>', 5, 4);
        const result = 1;
        expect(test).to.be.equal(result);
        const test2 = excuteExpr('>', 1.22, 4);
        const result2 = 0;
        expect(test2).to.be.equal(result2);
    });

    it('test excute comparesion result (<)', (): void => {
        const test = excuteExpr('<', 5, 4);
        const result = 0;
        expect(test).to.be.equal(result);
        const test2 = excuteExpr('<', 1.22, 4);
        const result2 = 1;
        expect(test2).to.be.equal(result2);
    });

    it('test excute comparesion result (>=)', (): void => {
        const test = excuteExpr('>=', 4, 4);
        const result = 1;
        expect(test).to.be.equal(result);
        const test2 = excuteExpr('>=', 1.22, 1);
        const result2 = 1;
        expect(test2).to.be.equal(result2);
    });

    it('test excute comparesion result (<=)', (): void => {
        const test = excuteExpr('<=', 4, 4);
        const result = 1;
        expect(test).to.be.equal(result);
        const test2 = excuteExpr('<=', 1.22, 1);
        const result2 = 0;
        expect(test2).to.be.equal(result2);
    });

    it('test excute comparesion result (==)', (): void => {
        const test = excuteExpr('==', 4, 4);
        const result = 1;
        expect(test).to.be.equal(result);
        const test2 = excuteExpr('==', 1.22, 4);
        const result2 = 0;
        expect(test2).to.be.equal(result2);
    });

});
