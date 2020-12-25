<?php

include_once 'testing.php';

/**
 * https://www.hackerrank.com/challenges/2d-array/problem
 *
 * @param $matrix
 */
function hourglassSum($matrix) {
	$hourGlasses = [];

	for ($i = 0; $i < 4; $i ++) {
		for ($j = 0; $j < 4; $j++) {
			$sum = 0;

			for ($k = 0; $k < 3; $k++) {
				for ($l = 0; $l < 3; $l++) {
					if ($k == 1 && ($l == 0 || $l == 2)) {
						continue;
					}
					$sum += $matrix[$i+$k][$j+$l];
				}
			}

			$hourGlasses[] = $sum;
		}
	}

	return max($hourGlasses);
}

test('hourglassSum', [
	[[[
		[1, 1, 1, 0, 0 ,0],
		[0, 1, 0, 0, 0 ,0],
		[1, 1, 1, 0, 0 ,0],
		[0, 0, 0, 0, 0 ,0],
		[0, 0, 0, 0, 0 ,0],
		[0, 0, 0, 0, 0 ,0],
	]], 7],
	[[[
		[1, 1, 1, 0, 0 ,0],
		[0, 1, 0, 0, 0 ,0],
		[1, 1, 1, 0, 0 ,0],
		[0, 0, 0, 2, 2 ,2],
		[0, 0, 0, 0, 2 ,0],
		[0, 0, 0, 2, 2 ,2],
	]], 14],
]);