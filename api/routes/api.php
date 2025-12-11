<?php

use App\Http\Controllers\API\CampaignController;
use App\Http\Controllers\API\CampaignFavoriteController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\DonationController;
use App\Http\Controllers\API\LeaderboardController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\ReportController;
use Illuminate\Support\Facades\Route;

Route::apiSingleton('profile', ProfileController::class);

Route::apiResource('donations', DonationController::class)->only(['store']);

Route::apiResource('campaigns', CampaignController::class);
Route::apiResource('campaigns.comments', CommentController::class)->shallow()->except(['show']);

Route::get('/profile/campaigns/favorited', [CampaignFavoriteController::class, 'index']);
Route::post('/campaigns/{campaign}/favorite', [CampaignFavoriteController::class, 'toggle']);

Route::get('/reports', [ReportController::class, 'index']);
Route::post('/campaigns/{campaign}/reports', [ReportController::class, 'store']);

Route::get('/leaderboard/campaigns', [LeaderboardController::class, 'topCampaigns']);
Route::get('/leaderboard/donors', [LeaderboardController::class, 'topDonors']);
Route::get('/leaderboard/creators', [LeaderboardController::class, 'topCreators']);
