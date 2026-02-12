<?php

use App\Http\Controllers\API\Campaign\CampaignController;
use App\Http\Controllers\API\Campaign\CampaignFavoriteController;
use App\Http\Controllers\API\Campaign\CampaignImageController;
use App\Http\Controllers\API\Campaign\CampaignUpdateController;
use App\Http\Controllers\API\Comment\CommentController;
use App\Http\Controllers\API\Comment\CommentReactionController;
use App\Http\Controllers\API\Donation\DonationController;
use App\Http\Controllers\API\Campaign\LeaderboardController;
use App\Http\Controllers\API\Payment\WooviWebhookController;
use App\Http\Controllers\API\ReportController;
use App\Http\Controllers\API\User\OAuthController;
use App\Http\Controllers\API\User\ProfileController;
use App\Http\Controllers\API\Withdrawal\WithdrawalController;
use Illuminate\Support\Facades\Route;

Route::get('/auth/{provider}/redirect', [OAuthController::class, 'redirect']);
Route::get('/auth/{provider}/callback', [OAuthController::class, 'callback']);
Route::apiSingleton('profile', ProfileController::class);

Route::post('/woovi/webhook', [WooviWebhookController::class, 'receive']);

Route::apiResource('donations', DonationController::class)->only(['store']);
Route::apiResource('campaigns.donations', DonationController::class)->shallow()->only(['index']);

Route::apiResource('campaigns', CampaignController::class);

Route::post('/campaigns/{campaign}/images', [CampaignImageController::class, 'store'])->middleware('auth:sanctum');
Route::apiResource('campaigns.withdrawals', WithdrawalController::class)->shallow()->except(['destroy', 'update']);
Route::apiResource('campaigns.updates', CampaignUpdateController::class)->shallow()->except(['update']);
Route::apiResource('campaigns.comments', CommentController::class)->shallow()->except(['show']);
Route::post('/comments/{comment}/react', [CommentReactionController::class, 'toggle']);
Route::get('/profile/campaigns/favorited', [CampaignFavoriteController::class, 'index']);
Route::post('/campaigns/{campaign}/favorite', [CampaignFavoriteController::class, 'toggle']);

Route::get('/reports', [ReportController::class, 'index']);
Route::post('/campaigns/{campaign}/reports', [ReportController::class, 'store']);

Route::get('/leaderboard/campaigns', [LeaderboardController::class, 'topCampaigns']);
Route::get('/leaderboard/donors', [LeaderboardController::class, 'topDonors']);
Route::get('/leaderboard/creators', [LeaderboardController::class, 'topCreators']);
