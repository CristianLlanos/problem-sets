<?php

include_once 'testing.php';

/**
 * https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem
 *
 * @param $list
 * @param $rotation
 */
function rotLeft($list, $rotation) {
	$length = count($list);

	$rotated = [];

	for ($i = 0; $i < $length; $i++) {
		$rotated[] = $list[($i + $rotation) % $length];
	}

	return $rotated;
}

test('rotLeft', [
	[[[1, 2, 3, 4, 5], 4], [5, 1, 2, 3, 4]],
]);