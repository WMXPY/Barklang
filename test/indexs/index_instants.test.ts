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

    it('test array instant functions init', (): void => {
        const testCode = '\
            var a array\r\n\
            return a\r\
        ';

        expect(bkc(testCode, {})).to.be.deep.equal([]);
    });

    it('test array instant functions push element', (): void => {
        const testCode = '\
            var a array\r\n\
            a = push a,"hello"\r\n\
            return a\r\
        ';

        expect(bkc(testCode, {})).to.be.deep.equal([
            "hello",
        ]);
    });

    it('test array instant functions unshift element', (): void => {
        const testCode = '\
            var a array\r\n\
            a = push a,"world"\r\n\
            a = unshift a,"hello"\r\n\
            return a\r\
        ';

        expect(bkc(testCode, {})).to.be.deep.equal([
            "hello",
            "world",
        ]);
    });

    it('test array instant functions push element (complex)', (): void => {
        const testCode = '\
            var a array\r\n\
            var b = qq 5\r\n\
            a = push a,b\r\n\
            return a\r\
        ';

        expect(bkc(testCode, {
            instants: [{
                command: 'qq',
                func: (a: number): number => {
                    return a;
                },
            }],
        })).to.be.deep.equal([
            5,
        ]);
    });

});
