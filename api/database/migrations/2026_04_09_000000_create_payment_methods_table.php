<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('gateway');
            $table->string('gateway_token');
            $table->string('gateway_customer_id')->nullable();
            $table->string('brand');
            $table->string('last_four', 4);
            $table->string('exp_month', 2);
            $table->string('exp_year', 4);
            $table->string('holder_name');
            $table->string('billing_postal_code')->nullable();
            $table->string('billing_address_number')->nullable();
            $table->string('billing_street')->nullable();
            $table->string('billing_neighborhood')->nullable();
            $table->string('billing_city')->nullable();
            $table->string('billing_state')->nullable();
            $table->string('billing_complement')->nullable();
            $table->boolean('is_default')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['user_id', 'deleted_at']);
            $table->unique(['user_id', 'gateway_token']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_methods');
    }
};
