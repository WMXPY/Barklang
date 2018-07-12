/**
 * @fileoverview test util check
 */

import { expect } from 'chai';
import { determine, determineReturn, findExternal } from '../../src/util/determine';

describe('test util determines', (): void => {
    it('find external should return -1 of external is not exist', (): void => {
        const test = 'test';

        expect(findExternal(test, [])).to.be.equal(-1);
    });

    it('determine should return external function if its exist', (): void => {
        const test = 'test';
        const func = () => {
            return null;
        };

        expect(determine(test, [{
            command: 'test',
            func,
        }])).to.be.equal(func);
    });

    it('determine should return internal function if its exist', (): void => {
        const test = 'return';
        const func = () => {
            return null;
        };

        // tslint:disable-next-line
        expect(determine(test, [])).to.be.not.null;
    });

    it('determine should be null if function is null', (): void => {
        const test = 'test';
        const func = null;

        // tslint:disable-next-line
        expect(determine(test, [{
            command: 'test',
            func: (func as any),
        }])).to.be.null;
    });

    it('determine should return null if its not exist', (): void => {
        const test = 'test';

        // tslint:disable-next-line
        expect(determine(test, [])).to.be.null;
    });

    it('determineReturn should return false if its not exist', (): void => {
        const test = 'test';

        // tslint:disable-next-line
        expect(determineReturn(test)).to.be.false;
    });
});
