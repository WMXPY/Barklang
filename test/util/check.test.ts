/**
 * @fileoverview test util check
 */

import { expect } from 'chai';

import { IBkcOptions } from '../../src/types/callable';
import { checkNamespace, fixOption } from '../../src/util/check';

describe('test util checks', (): void => {

    it('fixOption should make empty option better (null)', (): void => {
        // tslint:disable-next-line
        expect(fixOption((null as any))).to.be.not.null;
    });

    it('fixOption should make empty option better (undefinded)', (): void => {
        const result: IBkcOptions = {
            vars: [],
            instants: [],
            externals: [],
        };

        expect(fixOption(undefined)).to.be.deep.equal(result);
    });

    it('checkNamespace check if internalList is occupied namespace', (): void => {
        expect(checkNamespace('print')).to.be.equal(true);
    });

    it('checkNamespace check if internalList is not occupied namespace', (): void => {
        expect(checkNamespace('hello')).to.be.equal(false);
    });
});
