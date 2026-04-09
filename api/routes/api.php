<?php

use App\Http\Controllers\API\Campaign\CampaignController;
use App\Http\Controllers\API\Campaign\CampaignFavoriteController;
use App\Http\Controllers\API\Campaign\CampaignImageController;
use App\Http\Controllers\API\Campaign\CampaignTagController;
use App\Http\Controllers\API\Campaign\CampaignUpdateController;
use App\Http\Controllers\API\Campaign\LeaderboardController;
use App\Http\Controllers\API\Comment\CommentController;
use App\Http\Controllers\API\Comment\CommentReactionController;
use App\Http\Controllers\API\Donation\DonationController;
use App\Http\Controllers\API\Donation\DonationThankController;
use App\Http\Controllers\API\Notification\NotificationController;
use App\Http\Controllers\API\Payment\AsaasWebhookController;
use App\Http\Controllers\API\Payment\WooviWebhookController;
use App\Http\Controllers\API\ReportController;
use App\Http\Controllers\API\User\OAuthController;
use App\Http\Controllers\API\User\ProfileController;
use App\Http\Controllers\API\Withdrawal\WithdrawalController;
use Illuminate\Support\Facades\Route;

Route::get('/auth/{provider}/redirect', [OAuthController::class, 'redirect']);
Route::get('/auth/{provider}/callback', [OAuthController::class, 'callback']);
Route::apiSingleton('profile', ProfileController::class);
Route::post('/profile/avatar', [ProfileController::class, 'uploadAvatar'])->middleware('auth:sanctum');

Route::post('/woovi/webhook', [WooviWebhookController::class, 'receive']);
Route::post('/asaas/webhook', [AsaasWebhookController::class, 'receive']);

Route::apiResource('donations', DonationController::class)->only(['store']);
Route::apiResource('campaigns.donations', DonationController::class)->shallow()->only(['index']);

Route::get('/campaigns/{identifier}/donations/thankable', [DonationThankController::class, 'thankableDonations'])->middleware('auth:sanctum');
Route::post('/donations/{donation}/thank', [DonationThankController::class, 'thank'])->middleware('auth:sanctum');
Route::post('/campaigns/{identifier}/donations/thank', [DonationThankController::class, 'bulkThank'])->middleware('auth:sanctum');

Route::apiResource('campaigns', CampaignController::class);

Route::post('/campaigns/{campaign}/images', [CampaignImageController::class, 'store'])->middleware('auth:sanctum');
Route::apiResource('campaigns.withdrawals', WithdrawalController::class)->shallow()->except(['destroy', 'update']);
Route::apiResource('campaigns.updates', CampaignUpdateController::class)->shallow()->except(['update']);
Route::apiResource('campaigns.comments', CommentController::class)->shallow()->except(['show']);
Route::post('/comments/{comment}/react', [CommentReactionController::class, 'toggle']);
Route::get('/profile/campaigns/favorited', [CampaignFavoriteController::class, 'index']);
Route::post('/campaigns/{campaign:slug}/favorite', [CampaignFavoriteController::class, 'toggle']);

Route::post('/campaigns/{campaign}/tags', [CampaignTagController::class, 'store']);
Route::delete('/campaigns/{campaign}/tags/{tag}', [CampaignTagController::class, 'destroy']);

Route::get('/reports', [ReportController::class, 'index']);
Route::post('/campaigns/{campaign}/reports', [ReportController::class, 'store']);

Route::get('/leaderboard/campaigns', [LeaderboardController::class, 'topCampaigns']);
Route::get('/leaderboard/donors', [LeaderboardController::class, 'topDonors']);
Route::get('/leaderboard/creators', [LeaderboardController::class, 'topCreators']);

Route::get('/notifications', [NotificationController::class, 'index']);
Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);
