const test = require('./testing');

/**
 * https://leetcode.com/problems/median-of-two-sorted-arrays/
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let nums = nums1.concat(nums2).sort((a, b) => {
        if (a == b) {
            return 0;
        }

        return a < b ? -1 : 1;
    });

    let even = nums.length % 2 == 0;
    let middle = Math.floor((nums.length - 1) / 2);

    if (!even) {
        return nums[middle];
    }

    return (nums[middle] + nums[middle + 1]) / 2;
};


test(findMedianSortedArrays, [
    [[[1], []], 1],
    [[[], [1]], 1],
    [[[1, 3], [2]], 2],
    [[[1, 3], [2, 4]], 2.5],
    [[[3], [-2, -1]], -1],
]);