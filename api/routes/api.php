<?php

use App\Http\Controllers\API\CampaignController;
use App\Http\Controllers\API\DonateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/donations', [DonateController::class, 'store']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');

    Route::post('/campaigns', [CampaignController::class, 'store']);
});
