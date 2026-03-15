<?php
declare(strict_types=1);

namespace App\Services\User;

use App\Models\Address;
use App\Models\User;

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

        if (!$address) {
            return;
        }

        if (!$user->address) {
            $user->address()->create($address);
            return;
        }

        $user->address()->update($address);
    }
}
