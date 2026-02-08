<?php
declare(strict_types=1);

namespace App\Services\User;

use App\Models\Address;
use App\Models\User;

final class ProfileService
{
    public function updateProfile(User $user, array $data)
    {
        $address = $data['address'] ?? [];

        $user->update($data);

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
