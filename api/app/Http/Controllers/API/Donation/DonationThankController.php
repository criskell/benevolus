<?php

declare(strict_types=1);

namespace App\Http\Controllers\API\Donation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Donation\BulkThankDonorsRequest;
use App\Http\Requests\Donation\ThankDonorRequest;
use App\Http\Resources\Donation\DonationResource;
use App\Mail\DonorThankedMail;
use App\Models\Donation;
use App\Services\Campaign\CampaignService;
use App\Services\Donation\DonationService;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use OpenApi\Attributes as OA;

final class DonationThankController extends Controller
{
    public function __construct(
        private DonationService $donationService,
        private CampaignService $campaignService,
    ) {}

    #[OA\Get(
        operationId: 'listThankableDonations',
        path: '/api/campaigns/{identifier}/donations/thankable',
        summary: 'List thankable donations for a campaign',
        security: [['sanctum' => []]],
        tags: ['Donations'],
        parameters: [
            new OA\Parameter(
                name: 'identifier',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'string'),
                description: 'Campaign ID or slug'
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Thankable donations retrieved successfully',
                content: new OA\JsonContent(
                    type: 'object',
                    properties: [
                        new OA\Property(
                            property: 'data',
                            type: 'array',
                            items: new OA\Items(ref: '#/components/schemas/DonationResource')
                        ),
                    ]
                )
            ),
        ]
    )]
    public function thankableDonations(string $identifier)
    {
        $campaign = $this->campaignService->findBySlugOrId($identifier);

        Gate::authorize('thankDonors', $campaign);

        $donations = $this->donationService->listThankableDonations($campaign->id);

        return DonationResource::collection($donations);
    }

    #[OA\Post(
        operationId: 'thankDonor',
        path: '/api/donations/{id}/thank',
        summary: 'Send thank you message to a donor',
        security: [['sanctum' => []]],
        tags: ['Donations'],
        parameters: [
            new OA\Parameter(
                name: 'id',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'integer'),
                description: 'Donation ID'
            ),
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: '#/components/schemas/ThankDonorRequest')
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: 'Thank you message sent successfully',
                content: new OA\JsonContent(ref: '#/components/schemas/DonationResource')
            ),
            new OA\Response(response: 403, description: 'Forbidden'),
            new OA\Response(response: 422, description: 'Validation error'),
        ]
    )]
    public function thank(ThankDonorRequest $request, int $id)
    {
        $donation = $this->donationService->findById($id);

        abort_if(! $donation, 404);
        abort_if($donation->is_anonymous, 422, 'Cannot thank anonymous donors.');
        abort_if($donation->thanked_at !== null, 422, 'Donor has already been thanked.');

        $campaign = $donation->campaign;
        Gate::authorize('thankDonors', $campaign);

        $donation = $this->donationService->thankDonor($donation, $request->validated('message'));

        Mail::to($donation->user->email)->queue(new DonorThankedMail($donation, $campaign, $request->validated('message')));

        return new DonationResource($donation);
    }

    #[OA\Post(
        operationId: 'bulkThankDonors',
        path: '/api/campaigns/{identifier}/donations/thank',
        summary: 'Send thank you message to multiple donors',
        security: [['sanctum' => []]],
        tags: ['Donations'],
        parameters: [
            new OA\Parameter(
                name: 'identifier',
                in: 'path',
                required: true,
                schema: new OA\Schema(type: 'string'),
                description: 'Campaign ID or slug'
            ),
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: '#/components/schemas/BulkThankDonorsRequest')
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: 'Thank you messages sent successfully',
                content: new OA\JsonContent(
                    type: 'array',
                    items: new OA\Items(ref: '#/components/schemas/DonationResource')
                )
            ),
            new OA\Response(response: 403, description: 'Forbidden'),
        ]
    )]
    public function bulkThank(BulkThankDonorsRequest $request, string $identifier)
    {
        $campaign = $this->campaignService->findBySlugOrId($identifier);

        Gate::authorize('thankDonors', $campaign);

        $donations = Donation::where('campaign_id', $campaign->id)
            ->whereIn('id', $request->validated('donationIds'))
            ->where('is_anonymous', false)
            ->whereNull('thanked_at')
            ->with('user')
            ->get();

        $message = $request->validated('message');

        $thankedDonations = $donations->map(function (Donation $donation) use ($message, $campaign) {
            $personalizedMessage = str_replace(
                ['{nome}', '{valor}'],
                [$donation->user->name ?? 'Doador', 'R$ '.number_format($donation->amount_cents / 100, 2, ',', '.')],
                $message
            );

            $thanked = $this->donationService->thankDonor($donation, $personalizedMessage);

            Mail::to($donation->user->email)->queue(new DonorThankedMail($thanked, $campaign, $personalizedMessage));

            return $thanked;
        });

        return DonationResource::collection($thankedDonations);
    }
}
