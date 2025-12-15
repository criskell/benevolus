<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Benevolus | API</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body>
    <button id="donate">Donate</button>

    <script>
        donate.addEventListener("click", async () => {
            const response = await fetch("/api/donations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "amount": 100,
                    "anonymousDonation": false,
                    "donor": {
                        "name": "criskell",
                        "email": "cris.moraes.ds@gmail.com",
                        "taxId": "000.000.000-70",
                        "phoneNumber": "11973591090"
                    },
                    "paymentMethod": "pix",
                    "campaignId": 1,
                })
            });

            const {
                data: {
                    donation: {
                        externalReference
                    }
                }
            } = await response.json();

            Echo.channel(`donation.paid.${externalReference}`)
                .listen('.donation.paid', (e) => {
                    console.log('Payment confirmed');
                });
        });
    </script>
</body>

</html>