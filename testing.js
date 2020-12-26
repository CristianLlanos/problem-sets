function test(callback, cases) {
    cases.forEach(scenario => {
        let output = callback(...scenario[0]);
        assert_equals(scenario[1], output, format(scenario[0]));
    });
}

function assert_equals(expected, actual, message = '') {
    if (expected != actual) {
        let value = format(actual);
        console.log([`${message} - `, `Expected ${expected}, got ${value}`].join(' '));
    } else {
        console.log([`${message} - `, "Passed!"].join(' '));
    }
}

function format(value) {
    return JSON.stringify(value);
}

module.exports = test;