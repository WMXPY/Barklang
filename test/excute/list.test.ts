/**
 * @fileoverview test internal functions
 */

import { expect } from 'chai';

import { internals } from '../../src/excute/list';
import { monkConsoleLog, monkConsoleWarn } from '../util/monk';

describe('test internal functions', (): void => {

    it('test internal function print', (): void => {
        const testFunc = () => {
            for (let i of internals) {
                if (i.command === 'print') {
                    i.func('test');
                }
            }
        };
        expect(monkConsoleLog(testFunc)).to.be.equal('test');
    });

    it('test if return true', (): void => {
        const testFunc = () => {
            for (let i of internals) {
                if (i.command === 'warn') {
                    i.func('test');
                }
            }
        };
        expect(monkConsoleWarn(testFunc)).to.be.equal('test');
    });

});
