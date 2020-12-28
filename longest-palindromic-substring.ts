import test from "./testing";

function longestPalindrome(text: string): string {
    let maxLength = 0;
    let l = -1, r = -1;

    for (let i = 0; i < text.length; i++) {
        // Odd
        let oddLength = 0;

        for (let k = 0; k < Math.min(i + 1, text.length - i); k++) {
            if (text[i - k] == text[i + k]) {
                oddLength = 2 * k + 1;
            } else {
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
            } else {
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


function longestPalindromeManacher(text: string): string {
    let N = text.length;

    if (N == 0) {
        return '';
    }

    N = 2 * N + 1;

    let palindromes = Array(N).fill(0);

    palindromes[0] = 0;
    palindromes[1] = 1;

    let maxLength = 0;
    let maxCenter = 0;

    let C = 1;
    let R = 2;

    let iMirror = 0;
    let diff = -1;

    for (let i = 1; i < N; i++)
    {

        // get currentLeftPosition iMirror
        // for currentRightPosition i
        iMirror = 2 * C - i;
        palindromes[i] = 0;
        diff = R - i;

        // If currentRightPosition i is within
        // centerRightPosition R
        if (diff > 0) {
            palindromes[i] = Math.min(palindromes[iMirror], diff);
        }

        // Attempt to expand palindrome centered at
        // currentRightPosition i. Here for odd positions,
        // we compare characters and if match then
        // increment LPS Length by ONE. If even position,
        // we just increment LPS by ONE without
        // any character comparison
        let rightExpansion = i => i + palindromes[i] + 1;
        let leftExpansion = i => i - palindromes[i] - 1;
        let palindromeWithinLimits = i => leftExpansion(i) >= 0 && rightExpansion(i) < N;
        let isEmptyCenter = i => rightExpansion(i) % 2 == 0;
        let expansionCentersAreEqual = i => text.charAt(rightExpansion(i) / 2) == text.charAt(leftExpansion(i) / 2);

        while (palindromeWithinLimits(i) && (isEmptyCenter(i) || expansionCentersAreEqual(i))) {
            palindromes[i]++;
        }

        // Track maxLength
        if (palindromes[i] > maxLength) {
            maxLength = palindromes[i];
            maxCenter = i;
        }

        // If palindrome centered at currentRightPosition i
        // expand beyond centerRightPosition R,
        // adjust centerPosition C based on expanded palindrome.
        if (i + palindromes[i] > R) {
            C = i;
            R = i + palindromes[i];
        }
    }

    let start = (maxCenter - maxLength) / 2;
    let end = start + maxLength - 1;

    return text.slice(start, end + 1);
};

test(longestPalindrome, [
    [['babad'], 'bab'],
    [['cbbd'], 'bb'],
    [['a'], 'a'],
    [['ac'], 'a'],
    [['adacadc'], 'dacad'],
    [['adacada'], 'adacada'],
    [['aaaabcaaa'], 'aaaa'],
    [["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"], 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
]);