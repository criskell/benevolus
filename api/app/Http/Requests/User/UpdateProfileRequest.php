<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $this->user()->id,
            'address.street' => 'sometimes|string|max:255',
            'address.number' => 'sometimes|string|max:20',
            'address.city' => 'sometimes|string|max:100',
            'address.state' => 'sometimes|string|max:50',
            'address.zipcode' => 'sometimes|string|max:20',
            'address.country' => 'sometimes|string|max:100',
        ];
    }
}
