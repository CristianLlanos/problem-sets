<?php

function test($callback, $cases) {
	foreach ($cases as $case) {
		$output = $callback(...$case[0]);
		assert_equals($case[1], $output, format($case[0]));
	}
}

function assert_equals($expected, $actual, $message = '') {
	if ($expected != $actual) {
		$value = format($actual);
		echo implode(' ', ["$message -", "Expected $expected, got $value\n"]);
	} else {
		echo implode(' ', ["$message -", "Passed!\n"]);
	}
}

function format($value) {
	if (is_array($value)) {
		return '['.implode(', ', array_map('format', $value)).']';
	}
	return var_export($value, true);
}