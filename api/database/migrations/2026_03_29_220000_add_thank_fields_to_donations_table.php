<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('donations', function (Blueprint $table) {
            $table->boolean('is_anonymous')->default(false)->after('amount_cents');
            $table->text('thank_you_message')->nullable()->after('paid_at');
            $table->timestamp('thanked_at')->nullable()->after('thank_you_message');
        });
    }

    public function down(): void
    {
        Schema::table('donations', function (Blueprint $table) {
            $table->dropColumn(['is_anonymous', 'thank_you_message', 'thanked_at']);
        });
    }
};
