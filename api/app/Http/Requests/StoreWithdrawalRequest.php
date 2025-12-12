<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWithdrawalRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'amountCents' => 'required|numeric|min:0',
            'pixKey' => 'required|string',
            'pixKeyType' => 'required|string',
        ];
    }
}
