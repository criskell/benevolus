'use client';

import { useEffect, useId } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Checkbox } from '@heroui/react';
import { PatternFormat } from 'react-number-format';
import { Info } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import { useTranslations } from 'next-intl';
import 'react-phone-number-input/style.css';

const createStep2Schema = (t: (key: string) => string) => z.object({
  cpf: z.string()
    .min(1, t('cpf_required'))
    .refine((val) => val.replace(/\D/g, '').length === 11, {
      message: t('cpf_invalid'),
    }),
  email: z.string()
    .min(1, t('email_required'))
    .refine((val) => val.includes('@'), {
      message: t('email_invalid'),
    }),
  fullName: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  passwordConfirmation: z.string().optional(),
  wantsNewsletter: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.fullName !== undefined && data.fullName.trim().length > 0) {
    if (!data.fullName.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['fullName'],
        message: t('fullname_required'),
      });
    }
  }

  if (data.phone !== undefined && data.phone.length > 0) {
    if (!data.phone.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['phone'],
        message: t('phone_required'),
      });
    }
  }

  if (data.password !== undefined && data.passwordConfirmation !== undefined) {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: t('password_mismatch'),
      });
    }
  }
});

type ConfirmDataProps = {
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

export const ConfirmData = ({
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
}: ConfirmDataProps) => {
  const t = useTranslations('campaigns.create.step2');
  const phoneInputId = useId();

  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(createStep2Schema(t)),
    mode: 'onChange',
    defaultValues: {
      cpf,
      email,
      fullName,
      phone,
      password,
      passwordConfirmation,
      wantsNewsletter,
    },
  });

  const emailValue = watch('email');

  useEffect(() => {
    setValue('cpf', cpf);
    setValue('email', email);
    setValue('fullName', fullName);
    setValue('phone', phone);
    setValue('password', password);
    setValue('passwordConfirmation', passwordConfirmation);
    setValue('wantsNewsletter', wantsNewsletter);
  }, [cpf, email, fullName, phone, password, passwordConfirmation, wantsNewsletter, setValue]);

  const showAdditionalFields = emailValue.includes('@') && emailValue.trim() !== '';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {t('cpf_title')} <span className="text-primary">{t('cpf_highlight')}</span>
        </h2>
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <PatternFormat
              format="###.###.###-##"
              mask="_"
              customInput={Input}
              label={t('cpf_label')}
              placeholder={t('cpf_placeholder')}
              value={field.value}
              onValueChange={(values) => {
                field.onChange(values.value);
                onCpfChange(values.value);
              }}
              className="w-full"
              size="lg"
              isInvalid={!!errors.cpf}
              errorMessage={errors.cpf?.message}
            />
          )}
        />

        <div className="mt-4 p-4 rounded-lg bg-primary-50 border border-primary-200 flex gap-3">
          <Info className="text-primary shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="font-semibold text-primary text-sm mb-1">{t('cpf_info_title')}</p>
            <p className="text-sm text-default-700 leading-relaxed">
              {t('cpf_info_text')}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          {t('email_title')} <span className="text-primary">{t('email_highlight')}</span>
        </h2>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              isRequired
              type="email"
              label={t('email_label')}
              placeholder={t('email_placeholder')}
              value={field.value}
              onChange={(e) => {
                field.onChange(e.target.value);
                onEmailChange(e.target.value);
              }}
              className="w-full"
              size="lg"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
          )}
        />
      </div>

      {showAdditionalFields && (
        <div className="space-y-6 pt-4 border-t border-divider">
          <h2 className="text-xl font-semibold">
            {t('complete_title')} <span className="text-primary">{t('complete_highlight')}</span>
          </h2>

          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Input
                isRequired
                label={t('fullname_label')}
                placeholder={t('fullname_placeholder')}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  onFullNameChange(e.target.value);
                }}
                className="w-full"
                size="lg"
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <div>
                <PhoneInput
                  international
                  defaultCountry="BR"
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value || '');
                    onPhoneChange(value || '');
                  }}
                  inputComponent={Input}
                  id={phoneInputId}
                  countryCallingCodeEditable={false}
                  label={t('phone_label')}
                  labelPlacement="outside-top"
                />
                {errors.phone && (
                  <p className="text-xs text-danger mt-1">{errors.phone.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                isRequired
                type="password"
                label={t('password_label')}
                placeholder={t('password_placeholder')}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  onPasswordChange(e.target.value);
                }}
                className="w-full"
                size="lg"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="passwordConfirmation"
            control={control}
            render={({ field }) => (
              <Input
                isRequired
                type="password"
                label={t('password_confirmation_label')}
                placeholder={t('password_confirmation_placeholder')}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  onPasswordConfirmationChange(e.target.value);
                }}
                className="w-full"
                size="lg"
                isInvalid={!!errors.passwordConfirmation}
                errorMessage={errors.passwordConfirmation?.message}
              />
            )}
          />

          <Controller
            name="wantsNewsletter"
            control={control}
            render={({ field }) => (
              <Checkbox
                isSelected={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  onWantsNewsletterChange(value);
                }}
              >
                {t('newsletter_label')}
              </Checkbox>
            )}
          />
        </div>
      )}
    </div>
  );
}

