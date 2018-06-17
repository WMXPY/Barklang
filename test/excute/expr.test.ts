import { expect } from 'chai';

import excuteExpr from '../../src/excute/expr';

describe('test expression excution', (): void => {

    it('test excute calcualtion result (+ numbers)', (): void => {
        const test = excuteExpr('+', 5, 3);
        const result = 8;
        expect(test).to.be.equal(result);
    });

    it('test excute calcualtion result (+ strings)', (): void => {
        const test = excuteExpr('+', 'hello ', 'world');
        const result = 'hello world';
        expect(test).to.be.equal(result);
        const test2 = excuteExpr('+', '', 'world');
        const result2 = 'world';
        expect(test2).to.be.equal(result2);
    });

    it('test excute calcualtion result (+ number and string)', (): void => {
        const test = excuteExpr('+', 'hello ', 4);
        const result = 'hello 4';
        expect(test).to.be.equal(result);
        const test2 = excuteExpr('+', 4, 'world');
        const result2 = '4world';
        expect(test2).to.be.equal(result2);
    });

    it('test excute calcualtion result (- | * | /)', (): void => {
        const test = excuteExpr('-', 6, 8);
        const result = -2;
        expect(test).to.be.equal(result);
        const test4 = excuteExpr('-', 77, 4);
        const result4 = 73;
        expect(test4).to.be.equal(result4);

        const test2 = excuteExpr('*', 4, 6);
        const result2 = 24;
        expect(test2).to.be.equal(result2);
        const test5 = excuteExpr('*', -4, 6);
        const result5 = -24;
        expect(test5).to.be.equal(result5);

        const test3 = excuteExpr('/', 9, 4);
        const result3 = 2.25;
        expect(test3).to.be.equal(result3);
        const test6 = excuteExpr('/', -8, 4);
        const result6 = -2;
        expect(test6).to.be.equal(result6);
        const test7 = excuteExpr('/', 2, 5);
        const result7 = 0.4;
        expect(test7).to.be.equal(result7);
    });

});
