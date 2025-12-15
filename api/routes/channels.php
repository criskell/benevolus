<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('donation.paid.{externalReference}', function () {
    return true;
});
