/**
 * @fileoverview test index external instants
 */

import { expect } from 'chai';

import bkc from '../../src/index';

describe('test external instants excute', (): void => {

    it('test external instant return', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 3 + qq\r\
            return a\r\
        ';

        expect(bkc(testCode, {
            instants: [{
                command: 'qq',
                func: () => {
                    return 10;
                },
            }],
        })).to.be.equal(13);
    });

    it('test external instant with argument return', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = 3 + qq 15\r\
            return a\r\
        ';

        expect(bkc(testCode, {
            instants: [{
                command: 'qq',
                func: (a: number): number => {
                    return a;
                },
            }],
        })).to.be.equal(18);
    });

});
