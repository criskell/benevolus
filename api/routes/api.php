<?php

use App\Http\Controllers\API\CampaignController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\DonationController;
use App\Http\Controllers\API\ProfileController;
use Illuminate\Support\Facades\Route;

Route::apiResource('donations', DonationController::class)->only(['store']);
Route::apiSingleton('profile', ProfileController::class);
Route::apiResource('campaigns', CampaignController::class)->only(['store']);
Route::apiResource('campaigns.comments', CommentController::class)->shallow()->except(['show']);
