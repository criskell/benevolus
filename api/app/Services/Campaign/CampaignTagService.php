<?php

declare(strict_types=1);

namespace App\Services\Campaign;

use App\Models\Campaign;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Collection;

final class CampaignTagService
{
    public function associateTags(Campaign $campaign, array $tagNames): Collection
    {
        $tagIds = collect($tagNames)
            ->map(fn (string $name) => strtolower(trim($name)))
            ->unique()
            ->map(fn (string $name) => Tag::firstOrCreate(['name' => $name]))
            ->pluck('id');

        $campaign->tags()->syncWithoutDetaching($tagIds);

        return $campaign->tags()->get();
    }

    public function disassociateTag(Campaign $campaign, Tag $tag): void
    {
        $campaign->tags()->detach($tag);
    }
}
