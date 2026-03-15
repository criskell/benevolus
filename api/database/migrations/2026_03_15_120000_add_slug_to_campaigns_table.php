<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('title');
        });

        $campaigns = DB::table('campaigns')->get();
        foreach ($campaigns as $campaign) {
            $slug = Str::slug($campaign->title);
            $original = $slug;
            $counter = 1;

            while (DB::table('campaigns')->where('slug', $slug)->where('id', '!=', $campaign->id)->exists()) {
                $slug = $original.'-'.$counter;
                $counter++;
            }

            DB::table('campaigns')->where('id', $campaign->id)->update(['slug' => $slug]);
        }

        Schema::table('campaigns', function (Blueprint $table) {
            $table->string('slug')->nullable(false)->unique()->change();
        });
    }

    public function down(): void
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
