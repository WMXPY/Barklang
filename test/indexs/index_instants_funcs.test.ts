/**
 * @fileoverview test index external instants
 */

import { expect } from 'chai';

import bkc from '../../src/index';

describe('test internal instants complex execute', (): void => {

    it('test car instant function', (): void => {
        const testCode = '\
            var a array\r\n\
            a = push a,"world"\r\n\
            a = unshift a,"hello"\r\n\
            a = car a\r\n\
            return a\r\
        ';

        expect(bkc(testCode, {})).to.be.equal("hello");
    });

    it('test cdr instant function', (): void => {
        const testCode = '\
            var a array\r\n\
            a = push a,"world"\r\n\
            a = unshift a,"hello"\r\n\
            a = push a,"a"\r\n\
            a = push a,"b"\r\n\
            a = cdr a\r\n\
            return a\r\
        ';

        expect(bkc(testCode, {})).to.be.deep.equal([
            "world",
            "a",
            "b",
        ]);
    });

});
