/**
 * @fileoverview test ast generate
 */

import { expect } from 'chai';

import bkc from '../../src/index';

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

    it('test external command excute with instant function', (): void => {
        let temp: number = 0;
        const testCode = '\
            temp len \'121330\'\r\n\
            temp len \'dasda45\'\r\
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
        const result = 13;
        expect(temp).to.be.equal(result);
        expect(test).to.be.equal(10);
    });

    it('test external command excute with instant function (with space)', (): void => {
        let temp: number = 0;
        const testCode = '\
            temp len \'121  330\'\r\n\
            temp len \'dasda45\'\r\
            return  10\r\
        ';
        const test = bkc(testCode, {
            externals: [{
                command: 'temp',
                func: (arg: number) => {
                    temp += arg;
                },
            }],
        });
        const result = 15;
        expect(temp).to.be.equal(result);
        expect(test).to.be.equal(10);
    });

    it('test external command excute with instant function (with space 2)', (): void => {
        let temp: number = 0;
        const testCode = '\
            temp len    \'121  330\'\r\n\
            temp   len \'dasda45\'  \r\
            return  10\r\
        ';
        const test = bkc(testCode, {
            externals: [{
                command: 'temp',
                func: (arg: number) => {
                    temp += arg;
                },
            }],
        });
        const result = 15;
        expect(temp).to.be.equal(result);
        expect(test).to.be.equal(10);
    });

    it('test external command excute with instant function (error)', (): void => {
        let temp: number = 0;
        const testCode = '\
            temp len 121330\r\n\
            temp len \'dasda45\'\r\
            return 10\r\
        ';

        expect(bkc.bind(bkc, testCode, {
            externals: [{
                command: 'temp',
                func: (arg: number) => {
                    temp += arg;
                },
            }],
        })).to.be.throw('instant function excute failed');
    });

    it('test external command is excuted but defined as null', (): void => {
        let temp: number = 0;
        const testCode = '\
            temp len 121330\r\n\
            temp len \'dasda45\'\r\
            return 10\r\
        ';

        expect(bkc.bind(bkc, testCode, {
            externals: [{
                command: 'temp',
                func: (null as any),
            }],
        })).to.be.throw('instant function excute failed');
    });
});
