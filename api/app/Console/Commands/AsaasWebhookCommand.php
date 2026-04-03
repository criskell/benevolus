<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Services\Payment\Asaas\AsaasClient;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class AsaasWebhookCommand extends Command
{
    protected $signature = 'asaas:webhook {url : The public URL for the webhook endpoint}';

    protected $description = 'Register a webhook URL with Asaas to receive payment events';

    public function handle(AsaasClient $client): int
    {
        $url = $this->argument('url');
        $authToken = Str::random(64);

        $this->info("Registering webhook: {$url}");

        try {
            $response = $client->createWebhook([
                'name' => 'Benevolus',
                'url' => $url,
                'email' => config('mail.from.address'),
                'enabled' => true,
                'interrupted' => false,
                'authToken' => $authToken,
                'sendType' => 'SEQUENTIALLY',
                'events' => [
                    'PAYMENT_CONFIRMED',
                    'PAYMENT_RECEIVED',
                    'PAYMENT_OVERDUE',
                    'PAYMENT_REFUNDED',
                    'PAYMENT_DELETED',
                ],
            ]);

            $this->newLine();
            $this->info('Webhook registered successfully!');
            $this->table(['Field', 'Value'], [
                ['Webhook ID', $response['id'] ?? 'N/A'],
                ['URL', $response['url'] ?? $url],
                ['Status', $response['enabled'] ? 'Enabled' : 'Disabled'],
            ]);

            $this->newLine();
            $this->warn('Add the following to your .env file:');
            $this->line("ASAAS_WEBHOOK_TOKEN={$authToken}");
            $this->newLine();
            $this->warn('This token is shown only once. Save it now.');

            return self::SUCCESS;
        } catch (\Exception $e) {
            $this->error("Failed to register webhook: {$e->getMessage()}");

            return self::FAILURE;
        }
    }
}
