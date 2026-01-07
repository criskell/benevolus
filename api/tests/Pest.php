<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\IntegrationTestCase;
use Tests\TestCase;

pest()->extend(TestCase::class)->in('Unit');

pest()
    ->extend(IntegrationTestCase::class)
    ->use(RefreshDatabase::class)
    ->in('Feature');
