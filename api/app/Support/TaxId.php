<?php

namespace App\Support;

class TaxId
{
    public static function clean(string $taxId): string
    {
        return preg_replace('\D', '', $taxId);
    }

    public static function generatePlaceholderEmail(string $taxId): string
    {
        $clean = self::clean($taxId);

        return "donor_{$clean}@placeholder.local";
    }

    public static function isValid(string $taxId): bool
    {
        $cpf = self::clean($taxId);

        if (strlen($cpf) != 11 || preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }

        for ($t = 9; $t < 11; $t++) {
            $d = 0;

            for ($c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }

            $d = ((10 * $d) % 11) % 10;

            if ($cpf[$c] != $d) {
                return false;
            }
        }

        return true;
    }
}
