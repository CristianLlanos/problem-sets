"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("./testing");
function longestPalindrome1(text) {
    let maxLength = 0;
    let l = -1, r = -1;
    for (let i = 0; i < text.length; i++) {
        // Odd
        let oddLength = 0;
        for (let k = 0; k < Math.min(i + 1, text.length - i); k++) {
            if (text[i - k] == text[i + k]) {
                oddLength = 2 * k + 1;
            }
            else {
                break;
            }
        }
        if (maxLength < oddLength) {
            maxLength = oddLength;
            l = Math.ceil(i - oddLength / 2);
            r = Math.floor(i + oddLength / 2);
        }
        // Even
        let evenLength = 0;
        for (let k = 0; k < Math.min(i, text.length - i); k++) {
            if (text[i - k - 1] == text[i + k]) {
                evenLength = 2 * k + 2;
            }
            else {
                break;
            }
        }
        if (maxLength < evenLength) {
            maxLength = evenLength;
            l = i - evenLength / 2;
            r = i + evenLength / 2 - 1;
        }
    }
    return text.slice(l, r + 1);
}
// function longestPalindromeManacher(text: string): string {
function longestPalindrome(text) {
    let N = text.length;
    if (N == 0) {
        return '';
    }
    N = 2 * N + 1;
    let lengthOf = Array(N).fill(0);
    lengthOf[0] = 0; // Placeholder #
    lengthOf[1] = 1; // First letter is a palindrome of length 1
    let maxLength = 0;
    let maxCenter = 0;
    let theCenter = 1;
    let theRight = 2;
    let edgeDistance = -1;
    for (let rightCenter = 1; rightCenter < N; rightCenter++) {
        let leftCenter = 2 * theCenter - rightCenter;
        edgeDistance = theRight - rightCenter;
        if (edgeDistance > 0) {
            lengthOf[rightCenter] = Math.min(lengthOf[leftCenter], edgeDistance);
        }
        let nextLength = () => lengthOf[rightCenter] + 1;
        let nextRight = () => rightCenter + nextLength();
        let nextLeft = () => rightCenter - nextLength();
        let isSubset = () => 0 <= nextLeft() && nextRight() < N;
        let isPlaceholder = () => nextRight() % 2 == 0;
        let isPalindrome = () => text.charAt(nextRight() / 2) == text.charAt(nextLeft() / 2);
        while (isSubset() && (isPlaceholder() || isPalindrome())) {
            lengthOf[rightCenter]++;
        }
        if (rightCenter + lengthOf[rightCenter] > theRight) {
            theCenter = rightCenter;
            theRight = theCenter + lengthOf[theCenter];
        }
        // Track biggest palindrome
        if (lengthOf[rightCenter] > maxLength) {
            maxCenter = rightCenter;
            maxLength = lengthOf[rightCenter];
        }
    }
    let start = (maxCenter - maxLength) / 2;
    let end = start + maxLength - 1;
    return text.slice(start, end + 1);
}
;
testing_1.default(longestPalindrome, [
    [['babad'], 'bab'],
    [['cbbd'], 'bb'],
    [['a'], 'a'],
    [['ac'], 'a'],
    [['adacadc'], 'dacad'],
    [['adacada'], 'adacada'],
    [['aaaabcaaa'], 'aaaa'],
    [["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"], 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
]);
