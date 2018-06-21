/**
 * @fileoverview test ast generate
 */

import { expect } from 'chai';

import bkc from '../../src/index';

describe('test code return (init vars)', (): void => {

    it('test use initial var calc result instant', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 3 + tt\r\
            return a\r\
        ';
        const test = bkc(testCode, {
            vars: [{
                name: 'tt',
                value: 45,
            }],
        });
        const result = 48;
        expect(test).to.be.equal(result);
    });

    it('test use initial var calc result instant (with instant expression)', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 3 + tt + len cc\r\
            return a\r\
        ';
        const test = bkc(testCode, {
            vars: [{
                name: 'tt',
                value: 45,
            },
            {
                name: 'cc',
                value: 'hello',
            }],
        });
        const result = 53;
        expect(test).to.be.equal(result);
    });

    it('test name space of initial duplicated (instant)', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 3 + len\r\
            return a\r\
        ';
        expect(bkc.bind(bkc, testCode, {
            vars: [{
                name: 'len',
                value: 45,
            }],
        })).to.be.throw('initial namespace is occupied exception');
    });

    it('test name space of initial duplicated (internal)', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 3 + print\r\
            return a\r\
        ';
        expect(bkc.bind(bkc, testCode, {
            vars: [{
                name: 'print',
                value: 45,
            }],
        })).to.be.throw('initial namespace is occupied exception');
    });

    it('test name space of initial duplicated (reserved)', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 3 + var\r\
            return a\r\
        ';
        expect(bkc.bind(bkc, testCode, {
            vars: [{
                name: 'var',
                value: 45,
            }],
        })).to.be.throw('initial namespace is occupied exception');
    });

});
