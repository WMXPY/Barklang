/**
 * @fileoverview test ast generate error
 */

import { expect } from 'chai';
import { ERROR_CODE, errorMessage } from '../../src/execute/error';
import bkc from '../../src/index';

describe('test code execute with namespace error', (): void => {

    it('test var assign exception (instant)', (): void => {
        const testCode = '\
            var len 1\r\n\
            len = 3 + tt\r\
            return len\r\
        ';

        expect(bkc.bind(bkc, testCode)).to.be.throw(errorMessage(ERROR_CODE.NAMESPACE_UNAVAILABLE));
    });

    it('test var assign exception (reserved)', (): void => {
        const testCode = '\
            var var 1\r\n\
            var = 3 + tt\r\
            return var\r\
        ';

        expect(bkc.bind(bkc, testCode)).to.be.throw(errorMessage(ERROR_CODE.NAMESPACE_UNAVAILABLE));
    });

    it('test var assign exception (internal)', (): void => {
        const testCode = '\
            var return 1\r\n\
            return = 3 + tt\r\
            return return\r\
        ';

        expect(bkc.bind(bkc, testCode)).to.be.throw(errorMessage(ERROR_CODE.NAMESPACE_UNAVAILABLE));
    });

    it('test var assign exception (external)', (): void => {
        const testCode = '\
            var temp 1\r\n\
            temp = 3 + 4\r\
            return temp\r\
        ';

        expect(bkc.bind(bkc, testCode, {
            externals: [{
                command: 'temp',
                func: (arg: number) => {
                    return arg;
                },
            }],
        })).to.be.throw(errorMessage(ERROR_CODE.NAMESPACE_UNAVAILABLE));
    });

    it('test var assign exception (external var)', (): void => {
        const testCode = '\
            var sttt 1\r\n\
            sttt = 3 + 4\r\
            return sttt\r\
        ';

        expect(bkc.bind(bkc, testCode, {
            vars: [{
                name: 'sttt',
                value: 123,
            }],
            externals: [{
                command: 'temp',
                func: (arg: number) => {
                    return arg;
                },
            }],
        })).to.be.throw(errorMessage(ERROR_CODE.NAMESPACE_UNAVAILABLE));
    });

    it('test var assign exception should not throw if other name, empty option', (): void => {
        const testCode = '\
            var sttt 1\r\n\
            sttt = 3 + 4\r\
            return sttt\r\
        ';

        expect(bkc.bind(bkc, testCode, {})).to.be.not.throw(errorMessage(ERROR_CODE.ILLEGAL_CALCULATION));
    });


    it('test var assign exception should not throw if other name', (): void => {
        const testCode = '\
            var hello 1\r\n\
            hello = 3 + tt\r\
            return hello\r\
        ';

        expect(bkc.bind(bkc, testCode)).to.be.not.throw(errorMessage(ERROR_CODE.ILLEGAL_CALCULATION));
    });

});
