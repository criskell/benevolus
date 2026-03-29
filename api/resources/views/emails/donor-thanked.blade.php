<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agradecimento</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #e5e7eb; }
        .header h1 { color: #1f2937; font-size: 24px; margin: 0; }
        .content { padding: 30px 0; }
        .message { background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; border-radius: 0 8px 8px 0; margin: 20px 0; }
        .details { background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .details p { margin: 5px 0; }
        .footer { text-align: center; padding: 20px 0; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 14px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ config('app.name') }}</h1>
    </div>

    <div class="content">
        <p>Olá, {{ $donation->user->name ?? 'Doador' }}!</p>

        <p>O criador da campanha <strong>{{ $campaign->title }}</strong> enviou uma mensagem de agradecimento pela sua doação:</p>

        <div class="message">
            <p>{{ $thankYouMessage }}</p>
        </div>

        <div class="details">
            <p><strong>Campanha:</strong> {{ $campaign->title }}</p>
            <p><strong>Sua doação:</strong> R$ {{ number_format($donation->amount_cents / 100, 2, ',', '.') }}</p>
            <p><strong>Data:</strong> {{ $donation->paid_at->format('d/m/Y H:i') }}</p>
        </div>

        <p>Obrigado por fazer a diferença!</p>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. Todos os direitos reservados.</p>
    </div>
</body>
</html>
