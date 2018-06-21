/**
 * @fileoverview test expression excute
 */

import { expect } from 'chai';

import excuteExpr, { checkExist, checkExpr } from '../../src/excute/expr';

describe('test expression excution', (): void => {

    it('excuteExpr should throw unvalid expression exception if expr is not valid', (): void => {
        expect(() => {
            excuteExpr('@', 5, 3);
        }).to.be.throw('unvalid expression exception');
    });

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

    it('test excute calcualtion result (-)', (): void => {
        const test = excuteExpr('-', 6, 8);
        const result = -2;
        expect(test).to.be.equal(result);
        const test2 = excuteExpr('-', 77, 4);
        const result2 = 73;
        expect(test2).to.be.equal(result2);
    });

    it('test excute calcualtion result (*)', (): void => {
        const test = excuteExpr('*', 4, 6);
        const result = 24;
        expect(test).to.be.equal(result);
        const test2 = excuteExpr('*', -4, 6);
        const result2 = -24;
        expect(test2).to.be.equal(result2);
    });

    it('test excute calcualtion result (/)', (): void => {
        const test = excuteExpr('/', 9, 4);
        const result = 2.25;
        expect(test).to.be.equal(result);
        const test2 = excuteExpr('/', -8, 4);
        const result2 = -2;
        expect(test2).to.be.equal(result2);
        const test3 = excuteExpr('/', 2, 5);
        const result3 = 0.4;
        expect(test3).to.be.equal(result3);
    });

});

describe('test expr util functions', (): void => {

    it('checkExpr should return null when expr is not one of the option', (): void => {
        expect(checkExpr('&')).to.be.equal(null);
    });

    it('checkExpr should return expr itslef when expr is one of the option', (): void => {
        expect(checkExpr('+')).to.be.equal('+');
    });

    it('checkExist should return argument is undefinded or not', (): void => {
        expect(checkExist('hello')).to.be.equal(true);
        expect(checkExist(void 0)).to.be.equal(false);
    });

});

describe('test not enough argument exception throw', (): void => {

    it('should throw the exception with 1 argument only (+)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '+', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (-)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '-', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (*)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '*', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (/)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '/', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (<)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '<', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (>)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '>', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (<=)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '<=', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (>=)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '>=', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (==)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '==', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (!=)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '!=', 9)).to.be.throw('not enough argument exception');
    });

});

describe('test illegal calculation exception throw', (): void => {

    it('should NOT throw the exception with wrong argument type (+)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '+', 9, 'hello')).to.be.not.throw('illegal calculation exception');
        expect(excuteExpr.bind(excuteExpr, '+', 'hello', 9)).to.be.not.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (-)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '-', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(excuteExpr.bind(excuteExpr, '-', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (*)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '*', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(excuteExpr.bind(excuteExpr, '*', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (/)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '/', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(excuteExpr.bind(excuteExpr, '/', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (<)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '<', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(excuteExpr.bind(excuteExpr, '<', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (>)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '>', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(excuteExpr.bind(excuteExpr, '>', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (<=)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '<=', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(excuteExpr.bind(excuteExpr, '<=', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (>=)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '>=', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(excuteExpr.bind(excuteExpr, '>=', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (==)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '==', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(excuteExpr.bind(excuteExpr, '==', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (!=)', (): void => {
        expect(excuteExpr.bind(excuteExpr, '!=', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(excuteExpr.bind(excuteExpr, '!=', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

});
