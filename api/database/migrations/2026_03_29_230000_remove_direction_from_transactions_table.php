<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('transactions')
            ->where('direction', 'output')
            ->update(['amount_cents' => DB::raw('-amount_cents')]);

        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('direction');
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->enum('direction', ['input', 'output'])->default('input')->after('amount_cents');
        });

        DB::table('transactions')
            ->where('amount_cents', '<', 0)
            ->update([
                'direction' => 'output',
                'amount_cents' => DB::raw('ABS(amount_cents)'),
            ]);
    }
};
