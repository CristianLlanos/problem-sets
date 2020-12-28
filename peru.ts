import test from "./testing";

function concat(input: string[]): string {
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

test(concat, [
    [[['P>E', 'E>R', 'R>U']], 'PERU'],
    [[['P>E', 'R>U', 'E>R']], 'PERU'],
    [[['R>U', 'P>E', 'E>R']], 'PERU'],
]);