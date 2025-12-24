'use client';

import { useState, useEffect, useId } from 'react';
import { Input, Checkbox } from '@heroui/react';
import { PatternFormat } from 'react-number-format';
import { Info } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface Step2ConfirmDataProps {
  cpf: string;
  email: string;
  fullName: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
  wantsNewsletter: boolean;
  onCpfChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onFullNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmationChange: (value: string) => void;
  onWantsNewsletterChange: (value: boolean) => void;
}

export function Step2ConfirmData({
  cpf,
  email,
  fullName,
  phone,
  password,
  passwordConfirmation,
  wantsNewsletter,
  onCpfChange,
  onEmailChange,
  onFullNameChange,
  onPhoneChange,
  onPasswordChange,
  onPasswordConfirmationChange,
  onWantsNewsletterChange,
}: Step2ConfirmDataProps) {
  const phoneInputId = useId();
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<{
    cpf?: string;
    email?: string;
    fullName?: string;
    phone?: string;
    password?: string;
    passwordConfirmation?: string;
  }>({});

  useEffect(() => {
    const checkEmail = () => {
      if (!email || !email.includes('@')) {
        setEmailExists(null);
        return;
      }

      setEmailExists(false);
    };

    const timeoutId = setTimeout(checkEmail, 500);
    return () => clearTimeout(timeoutId);
  }, [email]);

  const validateCpf = (value: string) => {
    const cpfDigits = value.replace(/\D/g, '');
    if (value && cpfDigits.length !== 11) {
      return 'CPF deve ter 11 dígitos';
    }
    return '';
  };

  const validateEmail = (value: string) => {
    if (value && !value.includes('@')) {
      return 'Email inválido';
    }
    return '';
  };

  const handleCpfChange = (value: string) => {
    onCpfChange(value);
    setErrors((prev) => ({ ...prev, cpf: validateCpf(value) }));
  };

  const handleEmailChange = (value: string) => {
    onEmailChange(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handleFullNameChange = (value: string) => {
    onFullNameChange(value);
    const error = value && !value.trim() ? 'Nome completo é obrigatório' : '';
    setErrors((prev) => ({ ...prev, fullName: error }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    onPhoneChange(value || '');
    const error = value && !value.trim() ? 'Telefone é obrigatório' : '';
    setErrors((prev) => ({ ...prev, phone: error }));
  };

  const handlePasswordChange = (value: string) => {
    onPasswordChange(value);
    // Clear password confirmation error if it was set
    if (errors.passwordConfirmation && passwordConfirmation) {
      const confirmError =
        value !== passwordConfirmation ? 'As senhas não conferem' : '';
      setErrors((prev) => ({
        ...prev,
        password: '',
        passwordConfirmation: confirmError,
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const handlePasswordConfirmationChange = (value: string) => {
    onPasswordConfirmationChange(value);
    const error = password && value !== password ? 'As senhas não conferem' : '';
    setErrors((prev) => ({ ...prev, passwordConfirmation: error }));
  };

  const showAdditionalFields = emailExists === false && email.trim() !== '';

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
          onValueChange={(values) => handleCpfChange(values.value)}
          className="w-full"
          size="lg"
          isInvalid={!!errors.cpf}
          errorMessage={errors.cpf}
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
          onChange={(e) => handleEmailChange(e.target.value)}
          className="w-full"
          size="lg"
          isInvalid={!!errors.email}
          errorMessage={errors.email}
        />
      </div>

      {showAdditionalFields && (
        <div className="space-y-6 pt-4 border-t border-divider">
          <h2 className="text-xl font-semibold">
            Finalize seus <span className="text-primary">dados</span>
          </h2>

          <Input
            isRequired
            label="Insira seu nome completo"
            placeholder="Insira o seu nome completo"
            value={fullName}
            onChange={(e) => handleFullNameChange(e.target.value)}
            className="w-full"
            size="lg"
            isInvalid={!!errors.fullName}
            errorMessage={errors.fullName}
          />

          <div>
            <PhoneInput
              international
              defaultCountry="BR"
              value={phone}
              onChange={handlePhoneChange}
              inputComponent={Input}
              id={phoneInputId}
              countryCallingCodeEditable={false}
              label="Insira seu telefone (Whatsapp)"
              labelPlacement="outside-top"
            />
            {errors.phone && (
              <p className="text-xs text-danger mt-1">{errors.phone}</p>
            )}
          </div>

          <Input
            isRequired
            type="password"
            label="Crie uma senha"
            placeholder="Insira uma senha"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="w-full"
            size="lg"
          />

          <Input
            isRequired
            type="password"
            label="Confirme sua senha"
            placeholder="Repetir a senha"
            value={passwordConfirmation}
            onChange={(e) => handlePasswordConfirmationChange(e.target.value)}
            className="w-full"
            size="lg"
            isInvalid={!!errors.passwordConfirmation}
            errorMessage={errors.passwordConfirmation}
          />

          <Checkbox
            isSelected={wantsNewsletter}
            onValueChange={onWantsNewsletterChange}
          >
            Quero receber informações do Benevolus
          </Checkbox>
        </div>
      )}
    </div>
  );
}

