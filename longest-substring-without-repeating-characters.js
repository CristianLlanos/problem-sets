const test = require('./testing');

/**
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let window = [];
    let maxWindowSize = 0;

    for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
        let repeatingChar = window.indexOf(s[windowEnd]);

        if (repeatingChar >= 0) {
            if (maxWindowSize > (window.length + s.length - windowEnd - 1)) {
                return maxWindowSize;
            }

            window = window.slice(repeatingChar + 1);
        }

        window.push(s[windowEnd]);
        maxWindowSize = Math.max(maxWindowSize, window.length);
    }

    return maxWindowSize;
};

test(lengthOfLongestSubstring, [
    [["abcabcbb"], 3],
    [["aababc"], 3],
    [["bb"], 1],
    [["aabmmn"], 3],
    [[""], 0],
    [["abccd"], 3],
    [["abcaaabcd"], 4],
]);