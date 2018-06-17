/**
 * @fileoverview excute type interface
 */

export interface ICallable {
    command: string;
    func: (arg?: any) => void;
}

type TCallables = ICallable[];

export default TCallables;
