<?php
declare(strict_types=1);

namespace App\Http\Requests\Withdrawal;

use App\Models\Campaign;
use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "StoreWithdrawalRequest",
    required: ["amountCents", "pixKey", "pixKeyType"],
    properties: [
        new OA\Property(property: "amountCents", type: "integer", minimum: 0),
        new OA\Property(property: "pixKey", type: "string"),
        new OA\Property(property: "pixKeyType", type: "string"),
    ]
)]
class StoreWithdrawalRequest extends FormRequest
{
    public function authorize(): bool
    {
        $campaign = $this->route('campaign');

        if (!$campaign instanceof Campaign) {
            $campaign = Campaign::find($campaign);
        }

        return $campaign && $this->user()?->can('update', $campaign);
    }

    public function rules(): array
    {
        return [
            'amountCents' => 'required|numeric|min:0',
            'pixKey' => 'required|string',
            'pixKeyType' => 'required|string',
        ];
    }
}
