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

});
