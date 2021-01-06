<?php

function test($callback, $cases) {
	foreach ($cases as $case) {
		$output = $callback(... (array) $case[0]);
		assert_equals($case[1], $output, format($case[0]));
	}
}

function assert_equals($expected, $actual, $message = '') {
	if ($expected != $actual) {
		$expected = format($expected);
		$actual = format($actual);
		echo implode(' ', ["❌️ $message -", "Expected $expected, got $actual\n"]);
	} else {
		echo "✅ $message\n";
	}
}

function format($value) {
	if (is_array($value)) {
		return '['.implode(', ', array_map('format', $value)).']';
	}
	return var_export($value, true);
}
