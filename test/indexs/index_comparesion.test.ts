/**
 * @fileoverview test ast generate
 */

import { expect } from 'chai';

import bkc from '../../src/index';

describe('test code return (comparesion)', (): void => {

    it('test usage of comparesion expression in code', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 3 == 2\r\
            return a\r\
        ';
        const test = bkc(testCode);
        const result = 0;
        expect(test).to.be.equal(result);
    });

    it('test usage of comparesion expression in code (layer compare)', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 1 == 2 > 1\r\
            a = a + 5\r\
            return a\r\
        ';
        const test = bkc(testCode);
        const result = 6;
        expect(test).to.be.equal(result);
    });

    it('test usage of comparesion expression in code (layer compare) - 2', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 3 == 2 >= 1\r\
            return a\r\
        ';
        const test = bkc(testCode);
        const result = 0;
        expect(test).to.be.equal(result);
    });

    it('test usage of comparesion expression in code (layer compare) - 3', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 3 == 2 >= 1\r\
            var b = a == 0\r\
            if b\r\
            return 1\n\
            return a\r\
        ';
        const test = bkc(testCode);
        const result = 1;
        expect(test).to.be.equal(result);
    });

    it('test usage of comparesion expression in code (layer compare) - 4', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 3 == 2 >= 1\r\
            var b = a == 0\r\
            if a == 0\r\
            return 1\n\
            return a\r\
        ';
        const test = bkc(testCode);
        const result = 1;
        expect(test).to.be.equal(result);
    });

    it('test usage of comparesion expression in code (layer compare) - 5', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 3 == 2 >= 1\r\
            var b = a == 0\r\
            if a != 0\r\
            return 1\n\
            end\r\
            return a\r\
        ';
        const test = bkc(testCode);
        const result = 0;
        expect(test).to.be.equal(result);
    });

});
