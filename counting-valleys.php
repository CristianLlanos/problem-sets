<?php

include_once 'testing.php';

/*
 * https://www.hackerrank.com/challenges/counting-valleys/problem
 *
 * Complete the 'countingValleys' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER steps
 *  2. STRING path
 */

function countingValleys($steps, $path) {
	$seeLevel = 0;
	$valleys = 0;

	for ($i = 0; $i < $steps; $i++) {
		$step = $path[$i];

		if ($step == 'D') {
			$seeLevel--;
		}

		if ($step == 'U') {
			$seeLevel++;

			if ($seeLevel == 0) {
				$valleys++;
			}
		}
	}

	return $valleys;
}

test('countingValleys', [
	[[2, 'DU'], 1],
	[[8, 'UDDDUDUU'], 1],
	[[8, 'UDDUDUDU'], 3],
]);