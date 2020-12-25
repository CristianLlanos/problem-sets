<?php

include_once 'testing.php';

/**
 * https://www.hackerrank.com/challenges/sock-merchant/problem
 *
 * @param $count
 * @param $colors
 */
function sockMerchant($count, $colors) {
	$counts = [];

	foreach ($colors as $color) {
		if (!array_key_exists($color, $counts)) {
			$counts[$color] = 0;
		}

		$counts[$color]++;
	}

	$counts = array_map(function ($socks) {
		return (int) floor($socks / 2);
	}, $counts);

	return array_sum($counts);
}

test('sockMerchant', [
	[[9, [9, 10, 20, 20, 10, 10, 30, 50, 10, 20]], 3],
	[[2, [1, 1]], 1],
	[[1, [1]], 0],
]);