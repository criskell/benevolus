<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goalCents' => 'required|numeric|min:1',
        ]);

        $campaign = Campaign::create([
            'title' => $request->title,
            'description' => $request->description,
            'goal_cents' => $request->goalCents,
            'status' => 'approved',
            'user_id' => auth()->user()->id,
        ]);

        return response()->json([
            'data' => $campaign,
        ], 201);
    }
}
