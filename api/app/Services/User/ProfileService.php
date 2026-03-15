<?php
declare(strict_types=1);

namespace App\Services\User;

use App\Models\Address;
use App\Models\User;

final class ProfileService
{
    private const CAMEL_TO_SNAKE = [
        'taxId' => 'tax_id',
        'birthDate' => 'birth_date',
    ];

    public function updateProfile(User $user, array $data)
    {
        $address = $data['address'] ?? [];
        unset($data['address']);

        $mapped = [];
        foreach ($data as $key => $value) {
            $mapped[self::CAMEL_TO_SNAKE[$key] ?? $key] = $value;
        }

        $user->update($mapped);

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
