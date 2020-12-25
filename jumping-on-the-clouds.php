<?php

include_once 'testing.php';

/**
 * https://www.hackerrank.com/challenges/jumping-on-the-clouds/problem
 *
 * @param $c
 * @return int
 */
function jumpingOnClouds($c) {
	$end = count($c);
	$minimumJumps = 0;
	$i = 0;

	while ($i != ($end - 1)) {
		$cloud = $c[$i];
		$i++;

		$shortJump = $i;
		if ($shortJump >= $end) {
			continue;
		}

		$shortCloud = $c[$shortJump];
		if ($shortCloud == 1) {
			continue;
		}

		$minimumJumps++;

		if ($cloud == 1) {
			continue;
		}

		$bigJump = $i + 1;
		if ($bigJump >= $end) {
			continue;
		}

		$bigCloud = $c[$bigJump];
		if ($bigCloud == 1) {
			continue;
		}

		$i++;

	}

	return $minimumJumps;
}

test('jumpingOnClouds', [
	[[[0, 0, 0]], 1],
	[[[0, 0, 0, 0, 0]], 2],
	[[[0, 0]], 1],
	[[[0, 0, 0, 0, 0, 0]], 3],
	[[[0, 1]], 0],
	[[[0, 0, 1]], 1],
	[[[0, 0, 1, 0]], 2],
	[[[0, 0, 1, 1, 1, 0]], 2],
]);