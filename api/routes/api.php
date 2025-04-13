<?php

use App\Http\Controllers\API\CampaignController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum', function (Request $request) {
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');

    Route::post('/campaigns', [CampaignController::class, 'store']);
});

