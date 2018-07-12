/**
 * @fileoverview test expression execute
 */

import { expect } from 'chai';

import executeExpr, { checkExist, checkExpr } from '../../src/execute/expr';
import { EXPRESSION } from '../../src/types/ast';

describe('test expression execution', (): void => {

    it('executeExpr should throw invalid expression exception if expr is not valid', (): void => {
        expect(() => {
            executeExpr('@', 5, 3);
        }).to.be.throw('invalid expression exception');
    });

    it('test execute calculation result (+ numbers)', (): void => {
        const test = executeExpr(EXPRESSION.PLUS, 5, 3);
        const result = 8;
        expect(test).to.be.equal(result);
    });

    it('test execute calculation result (+ strings)', (): void => {
        const test = executeExpr(EXPRESSION.PLUS, 'hello ', 'world');
        const result = 'hello world';
        expect(test).to.be.equal(result);
        const test2 = executeExpr(EXPRESSION.PLUS, '', 'world');
        const result2 = 'world';
        expect(test2).to.be.equal(result2);
    });

    it('test execute calculation result (+ number and string)', (): void => {
        const test = executeExpr(EXPRESSION.PLUS, 'hello ', 4);
        const result = 'hello 4';
        expect(test).to.be.equal(result);
        const test2 = executeExpr(EXPRESSION.PLUS, 4, 'world');
        const result2 = '4world';
        expect(test2).to.be.equal(result2);
    });

    it('test execute calculation result (-)', (): void => {
        const test = executeExpr(EXPRESSION.MINUS, 6, 8);
        const result = -2;
        expect(test).to.be.equal(result);
        const test2 = executeExpr(EXPRESSION.MINUS, 77, 4);
        const result2 = 73;
        expect(test2).to.be.equal(result2);
    });

    it('test execute calculation result (*)', (): void => {
        const test = executeExpr('*', 4, 6);
        const result = 24;
        expect(test).to.be.equal(result);
        const test2 = executeExpr('*', -4, 6);
        const result2 = -24;
        expect(test2).to.be.equal(result2);
    });

    it('test execute calculation result (/)', (): void => {
        const test = executeExpr('/', 9, 4);
        const result = 2.25;
        expect(test).to.be.equal(result);
        const test2 = executeExpr('/', -8, 4);
        const result2 = -2;
        expect(test2).to.be.equal(result2);
        const test3 = executeExpr('/', 2, 5);
        const result3 = 0.4;
        expect(test3).to.be.equal(result3);
    });

    it('test execute calculation result (=)', (): void => {
        const test = executeExpr('=', 9, 4);
        const result = 9;
        expect(test).to.be.equal(result);
        const test2 = executeExpr('=', 9);
        const result2 = 9;
        expect(test2).to.be.equal(result2);
    });

});

describe('test expr util functions', (): void => {

    it('checkExpr should return null when expr is not one of the option', (): void => {
        expect(checkExpr('&')).to.be.equal(null);
    });

    it('checkExpr should return expr itself when expr is one of the option', (): void => {
        expect(checkExpr(EXPRESSION.PLUS)).to.be.equal(EXPRESSION.PLUS);
    });

    it('checkExist should return argument is undefined or not', (): void => {
        expect(checkExist('hello')).to.be.equal(true);
        expect(checkExist(void 0)).to.be.equal(false);
    });

});

describe('test not enough argument exception throw', (): void => {

    it('should throw the exception with 1 argument only (+)', (): void => {
        expect(executeExpr.bind(executeExpr, EXPRESSION.PLUS, 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (-)', (): void => {
        expect(executeExpr.bind(executeExpr, EXPRESSION.MINUS, 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (*)', (): void => {
        expect(executeExpr.bind(executeExpr, '*', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (/)', (): void => {
        expect(executeExpr.bind(executeExpr, '/', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (<)', (): void => {
        expect(executeExpr.bind(executeExpr, '<', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (>)', (): void => {
        expect(executeExpr.bind(executeExpr, '>', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (<=)', (): void => {
        expect(executeExpr.bind(executeExpr, '<=', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (>=)', (): void => {
        expect(executeExpr.bind(executeExpr, '>=', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (==)', (): void => {
        expect(executeExpr.bind(executeExpr, '==', 9)).to.be.throw('not enough argument exception');
    });

    it('should throw the exception with 1 argument only (!=)', (): void => {
        expect(executeExpr.bind(executeExpr, '!=', 9)).to.be.throw('not enough argument exception');
    });

});

describe('test illegal calculation exception throw', (): void => {

    it('should NOT throw the exception with wrong argument type (+)', (): void => {
        expect(executeExpr.bind(executeExpr, EXPRESSION.PLUS, 9, 'hello')).to.be.not.throw('illegal calculation exception');
        expect(executeExpr.bind(executeExpr, EXPRESSION.PLUS, 'hello', 9)).to.be.not.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (-)', (): void => {
        expect(executeExpr.bind(executeExpr, EXPRESSION.MINUS, 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(executeExpr.bind(executeExpr, EXPRESSION.MINUS, 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (*)', (): void => {
        expect(executeExpr.bind(executeExpr, '*', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(executeExpr.bind(executeExpr, '*', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (/)', (): void => {
        expect(executeExpr.bind(executeExpr, '/', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(executeExpr.bind(executeExpr, '/', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (<)', (): void => {
        expect(executeExpr.bind(executeExpr, '<', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(executeExpr.bind(executeExpr, '<', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (>)', (): void => {
        expect(executeExpr.bind(executeExpr, '>', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(executeExpr.bind(executeExpr, '>', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (<=)', (): void => {
        expect(executeExpr.bind(executeExpr, '<=', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(executeExpr.bind(executeExpr, '<=', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (>=)', (): void => {
        expect(executeExpr.bind(executeExpr, '>=', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(executeExpr.bind(executeExpr, '>=', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (==)', (): void => {
        expect(executeExpr.bind(executeExpr, '==', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(executeExpr.bind(executeExpr, '==', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

    it('should throw the exception with wrong argument type (!=)', (): void => {
        expect(executeExpr.bind(executeExpr, '!=', 9, 'hello')).to.be.throw('illegal calculation exception');
        expect(executeExpr.bind(executeExpr, '!=', 'hello', 9)).to.be.throw('illegal calculation exception');
    });

});
