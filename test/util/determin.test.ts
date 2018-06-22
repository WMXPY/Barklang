/**
 * @fileoverview test util check
 */

import { expect } from 'chai';
import { determin, determinReturn, findExternal } from '../../src/util/determin';

describe('test util determins', (): void => {
    it('findexternal should return -1 of enternal is not exist', (): void => {
        const test = 'test';

        expect(findExternal(test, [])).to.be.equal(-1);
    });

    it('determin should return function if its exist', (): void => {
        const test = 'test';
        const func = () => {
            return null;
        };

        expect(determin(test, [{
            command: 'test',
            func,
        }])).to.be.equal(func);
    });

    it('determin should be null if function is null', (): void => {
        const test = 'test';
        const func = null;

        // tslint:disable-next-line
        expect(determin(test, [{
            command: 'test',
            func: (func as any),
        }])).to.be.null;
    });

    it('determin should return null if its not exist', (): void => {
        const test = 'test';

        // tslint:disable-next-line
        expect(determin(test, [])).to.be.null;
    });

    it('determinReturn should return false if its not exist', (): void => {
        const test = 'test';

        // tslint:disable-next-line
        expect(determinReturn(test)).to.be.false;
    });
});
