<?php

namespace App\Services;

use App\DTO\User\DonorDTO;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function findOrCreateDonor(DonorDTO $donor): User
    {
        return User::firstOrCreate(
            ['email' => $donor->email],
            [
                'name' => $donor->name,
                'password' => Hash::make(uniqid('donor_', true))
            ]
        );
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function findById(int $id): ?User
    {
        return User::where('id', $id)->first();
    }

    public function updateDonor(User $user, DonorDTO $donor): User
    {
        $user->update([
            'name' => $donor->name,
        ]);

        return $user->fresh();
    }
}
