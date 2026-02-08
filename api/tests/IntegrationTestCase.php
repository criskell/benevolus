<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\Concerns\AuthenticatesUsers;
use Tests\Concerns\MakesApiRequests;

abstract class IntegrationTestCase extends BaseTestCase
{
    use CreatesApplication;
    use AuthenticatesUsers;
    use MakesApiRequests;
}
