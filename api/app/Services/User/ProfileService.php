<?php

declare(strict_types=1);

namespace App\Services\User;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

final class ProfileService
{
    public function getProfile(User $user): User
    {
        return $user
            ->load('address')
            ->loadCount([
                'favoriteCampaigns',
                'donations' => fn ($query) => $query->where('payment_status', 'paid'),
            ]);
    }

    public function updateProfile(User $user, array $data): void
    {
        $address = $data['address'] ?? [];

        $user->update([
            'name' => $data['name'] ?? $user->name,
            'email' => $data['email'] ?? $user->email,
            'tax_id' => $data['taxId'] ?? $user->tax_id,
            'birth_date' => $data['birthDate'] ?? $user->birth_date,
            'phone' => $data['phone'] ?? $user->phone,
        ]);

        if (! $address) {
            return;
        }

        if (! $user->address) {
            $user->address()->create($address);

            return;
        }

        $user->address()->update($address);
    }

    public function updateAvatar(User $user, UploadedFile $file): User
    {
        if ($user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        $path = 'avatars/'.$user->id;
        $fileName = Str::random(48).'.'.$file->getClientOriginalExtension();
        $fullPath = $path.'/'.$fileName;

        Storage::disk('public')->putFileAs($path, $file, $fileName);

        $user->update(['avatar_path' => $fullPath]);

        return $this->getProfile($user);
    }
}
