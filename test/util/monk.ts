/**
 * @fileoverview monks
 */

export const monkConsoleLog = (func: () => any): string => {
    const storage = console.log;
    let temp: string[] = [];

    console.log = (...value: any[]) => {
        for (let i of value) {
            temp.push(i.toString());
        }
    };

    func();

    console.log = storage;

    return temp.join('\n');
};

export const monkConsoleWarn = (func: () => any): string => {
    const storage = console.warn;
    let temp: string[] = [];

    console.warn = (...value: any[]) => {
        for (let i of value) {
            temp.push(i.toString());
        }
    };

    func();

    console.warn = storage;

    return temp.join('\n');
};
