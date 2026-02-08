
<?php

use Pest\Concerns\Expectable;
use Pest\PendingCalls\BeforeEachCall;
use Pest\PendingCalls\TestCall;
use Pest\Support\HigherOrderTapProxy;
use Tests\TestCase;

/**
 * Runs the given closure before all tests in the current file.
 *
 * @param-closure-this TestCase  $closure
 */
function beforeAll(Closure $closure): void {}

/**
 * Runs the given closure before each test in the current file.
 *
 * @param-closure-this TestCase  $closure
 *
 * @return HigherOrderTapProxy<Expectable|TestCall|TestCase>|Expectable|TestCall|TestCase|mixed
 *
 * @disregard P1075 Not all paths return a value.
 */
function beforeEach(?Closure $closure = null): BeforeEachCall {}

/**
 * Adds the given closure as a test. The first argument
 * is the test description; the second argument is
 * a closure that contains the test expectations.
 *
 * @param-closure-this TestCase  $closure
 *
 * @return Expectable|TestCall|TestCase|mixed
 *
 * @disregard P1075 Not all paths return a value.
 */
function test(?string $description = null, ?Closure $closure = null): HigherOrderTapProxy|TestCall {}

/**
 * Adds the given closure as a test. The first argument
 * is the test description; the second argument is
 * a closure that contains the test expectations.
 *
 * @param-closure-this TestCase  $closure
 *
 * @return Expectable|TestCall|TestCase|mixed
 *
 * @disregard P1075 Not all paths return a value.
 */
function it(string $description, ?Closure $closure = null): TestCall {}
