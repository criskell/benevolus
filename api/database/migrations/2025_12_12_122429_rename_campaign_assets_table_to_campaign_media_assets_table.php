<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::rename('campaign_assets', 'campaign_media_assets');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('campaign_media_assets', 'campaign_assets');
    }
};
