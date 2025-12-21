'use client';

import { Input, Link } from '@heroui/react';
import { NumericFormat } from 'react-number-format';

interface Step1BasicInfoProps {
  title: string;
  goalCents: number;
  onTitleChange: (value: string) => void;
  onGoalCentsChange: (value: number) => void;
}

export function Step1BasicInfo({
  title,
  goalCents,
  onTitleChange,
  onGoalCentsChange,
}: Step1BasicInfoProps) {
  const handleGoalChange = (values: { floatValue?: number }) => {
    const value = values.floatValue || 0;
    // Converte reais para centavos
    onGoalCentsChange(Math.round(value * 100));
  };

  return (
    <div className="space-y-8">
      <div>
        <Input
          isRequired
          label="Dê um nome para sua vaquinha"
          placeholder="Ex.: Ajuda para comprar uma casa"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full"
          size="lg"
        />
      </div>

      <div>
        <NumericFormat
          customInput={Input}
          isRequired
          label="De quanto você precisa?"
          placeholder="Ex.: 10.000,00"
          value={goalCents > 0 ? goalCents / 100 : undefined}
          onValueChange={handleGoalChange}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          prefix="R$ "
          allowNegative={false}
          className="w-full"
          size="lg"
        />
        <p className="text-sm text-default-500 mt-2">
          Valor mínimo: R$ 1,00
        </p>
      </div>

      <p className="text-sm text-default-500 text-center pt-4">
        Ao clicar no botão abaixo você declara que é maior de 18 anos, leu e está de acordo com os{' '}
        <Link href="/terms" className="text-primary">
          Termos, Taxas, Prazos e Regulamentos
        </Link>
        .
      </p>
    </div>
  );
}

