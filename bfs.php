<?php

include_once 'testing.php';

function bfs($adjacencyList, $target, $start) {
	$visited = [];
	$queue = [$start];

	if (!array_key_exists($start, $adjacencyList)) {
		return false;
	}

	while (!empty($queue)) {
		$source = array_pop($queue);

		$destinations = $adjacencyList[$source];

		foreach ($destinations as $destination) {
			if ($destination == $target) {
				return true;
			}

			if (!array_key_exists($destination, $visited)) {
				$visited[$destination] = true;
				$queue[] = $destination;
			}
		}
	}

	return false;
}

test('bfs', [
	[[[
		'a' => ['b', 'd'],
		'b' => ['c', 'd'],
		'c' => ['b', 'd'],
		'd' => ['b', 'c'],
	], 'c', 'a'], true],
]);