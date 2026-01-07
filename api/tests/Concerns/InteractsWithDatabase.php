<?php

namespace Tests\Concerns;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

trait InteractsWithDatabase
{
    use RefreshDatabase;

    protected function assertDatabaseHasCount(string $table, int $count, array $conditions = []): void
    {
        $query = DB::table($table);

        foreach ($conditions as $column => $value) {
            $query->where($column, $value);
        }

        $this->assertEquals($count, $query->count(), "Failed asserting that table [{$table}] has {$count} record(s).");
    }

    protected function assertDatabaseEmpty(string $table): void
    {
        $this->assertEquals(0, DB::table($table)->count(), "Failed asserting that table [{$table}] is empty.");
    }

    protected function assertDatabaseNotEmpty(string $table): void
    {
        $this->assertGreaterThan(0, DB::table($table)->count(), "Failed asserting that table [{$table}] is not empty.");
    }
}
