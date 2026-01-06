<?php

namespace Tests\Concerns;

use Illuminate\Testing\AssertableJsonString;
use Illuminate\Testing\TestResponse;

trait MakesApiRequests
{
    protected function assertJsonStructure(array $structure, $responseData = null): void
    {
        if ($responseData === null) {
            $responseData = $this->decodeResponseJson();
        }

        $json = new AssertableJsonString($responseData);

        $json->assertStructure($structure);
    }

    protected function assertApiSuccess(TestResponse $response, int $statusCode = 200): void
    {
        $response->assertStatus($statusCode)
            ->assertJsonStructure([
                'data',
            ]);
    }

    protected function assertApiError(TestResponse $response, int $statusCode = 400, ?string $message = null): void
    {
        $response->assertStatus($statusCode);

        if ($message) {
            $response->assertJson([
                'message' => $message,
            ]);
        }
    }

    protected function assertApiValidationError(TestResponse $response, array $errors = []): void
    {
        $response->assertStatus(422)
            ->assertJsonStructure([
                'message',
                'errors',
            ]);

        if (!empty($errors)) {
            $response->assertJsonValidationErrors($errors);
        }
    }
}
