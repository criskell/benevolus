<?php

use App\Http\Controllers\API\CampaignController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\DonateController;
use App\Http\Controllers\API\ProfileController;
use Illuminate\Support\Facades\Route;

Route::post('/donations', [DonateController::class, 'store']);
Route::apiResource('profile', ProfileController::class)->only(['index']);
Route::apiResource('campaigns', CampaignController::class)->only(['store']);
Route::apiResource('campaigns.comments', CommentController::class)->shallow()->except(['show']);
