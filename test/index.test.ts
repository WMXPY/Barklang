/**
 * @fileoverview test ast generate
 */

import { expect } from 'chai';

import bkc from '../src/index';

describe('test code return', (): void => {

    it('test var assign with expression', (): void => {
        const testCode = '\
            var a = 1\r\n\
            return a\r\
        ';
        const test = bkc(testCode);
        const result = 1;
        expect(test).to.be.equal(result);
    });

    it('test var assign and return command', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = \'test\'\n\
            a = 3\r\
            return a\r\
        ';
        const test = bkc(testCode);
        const result = 3;
        expect(test).to.be.equal(result);
    });

    it('test no return command code', (): void => {
        const testCode = '\
            var a 1\r\n\
            a = \'test\'\n\
            a = 3\r\
        ';
        const test = bkc(testCode);
        const result = undefined;
        expect(test).to.be.equal(result);
    });

    it('test external command excute', (): void => {
        let temp: number = 0;
        const testCode = '\
            temp\r\n\
            temp\r\
        ';
        bkc(testCode, {
            externals: [{
                command: 'temp',
                func: () => {
                    temp++;
                },
            }],
        });
        const result = 2;
        expect(temp).to.be.equal(result);
    });

    it('test external command excute', (): void => {
        let temp: number = 0;
        const testCode = '\
            temp\r\n\
            temp\r\
        ';
        const test = bkc(testCode, {
            externals: [{
                command: 'temp',
                func: () => {
                    temp++;
                },
            }],
        });
        const result = 2;
        expect(temp).to.be.equal(result);
        expect(test).to.be.equal(void 0);
    });

    it('test external command excute with argument', (): void => {
        let temp: number = 0;
        const testCode = '\
            temp 30\r\n\
            temp 45\r\
            return 10\r\
        ';
        const test = bkc(testCode, {
            externals: [{
                command: 'temp',
                func: (arg: number) => {
                    temp += arg;
                },
            }],
        });
        const result = 75;
        expect(temp).to.be.equal(result);
        expect(test).to.be.equal(10);
    });
});