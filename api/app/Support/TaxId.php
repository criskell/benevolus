<?php

namespace App\Support;

final class TaxId
{
    public static function clean(string $taxId): string
    {
        return preg_replace('\D', '', $taxId);
    }

    public static function isValid(string $taxId): bool
    {
        $cpf = self::clean($taxId);

        if (strlen($cpf) != 11 || preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }

        for ($digitPosition = 9; $digitPosition < 11; $digitPosition++) {
            $sum = 0;

            for ($index = 0; $index < $digitPosition; $index++) {
                $sum += $cpf[$index] * (($digitPosition + 1) - $index);
            }

            $calculatedDigit = ((10 * $sum) % 11) % 10;

            if ($cpf[$digitPosition] != $calculatedDigit) {
                return false;
            }
        }

        return true;
    }
}
