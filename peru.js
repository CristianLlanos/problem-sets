"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("./testing");
function concat(input) {
    let paths = new Map();
    let areChildren = new Set();
    input.forEach(item => {
        paths.set(item[0], item[2]);
        areChildren.add(item[2]);
    });
    let start = null;
    for (let source of paths.keys()) {
        if (!areChildren.has(source)) {
            start = source;
            break;
        }
    }
    let result = '';
    do {
        result += start;
        start = paths.get(start);
    } while (start);
    return result;
}
testing_1.default(concat, [
    [[['P>E', 'E>R', 'R>U']], 'PERU'],
    [[['P>E', 'R>U', 'E>R']], 'PERU'],
    [[['R>U', 'P>E', 'E>R']], 'PERU'],
]);
