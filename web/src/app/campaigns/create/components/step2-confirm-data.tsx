'use client';

import { Input } from '@heroui/react';
import { PatternFormat } from 'react-number-format';
import { Info } from 'lucide-react';

interface Step2ConfirmDataProps {
  cpf: string;
  email: string;
  onCpfChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

export function Step2ConfirmData({
  cpf,
  email,
  onCpfChange,
  onEmailChange,
}: Step2ConfirmDataProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Confirme seu <span className="text-primary">CPF</span>
        </h2>
        <PatternFormat
          format="###.###.###-##"
          mask="_"
          customInput={Input}
          label="CPF"
          placeholder="Insira o seu CPF"
          value={cpf}
          onValueChange={(values) => onCpfChange(values.value)}
          className="w-full"
          size="lg"
        />

        <div className="mt-4 p-4 rounded-lg bg-primary-50 border border-primary-200 flex gap-3">
          <Info className="text-primary shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="font-semibold text-primary text-sm mb-1">IMPORTANTE</p>
            <p className="text-sm text-default-700 leading-relaxed">
              O saque dos valores arrecadados será executado apenas para a Chave Pix vinculada ao seu CPF. Antes de sacar, certifique-se de que esta Chave Pix CPF está cadastrada junto ao seu banco.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Confirme seu <span className="text-primary">Email</span>
        </h2>
        <Input
          isRequired
          type="email"
          label="Email"
          placeholder="Insira o seu e-mail"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full"
          size="lg"
        />
      </div>
    </div>
  );
}

