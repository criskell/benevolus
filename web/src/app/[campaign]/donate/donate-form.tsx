'use client';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { PatternFormat } from 'react-number-format';
import {
  Button,
  Card,
  Input,
  Switch,
} from '@heroui/react';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { PixIcon } from '@/components/icons/pix';
import { BarcodeIcon, CreditCardIcon } from 'lucide-react';
import { PayPalIcon } from '@/components/icons/paypal';
import { BitcoinIcon } from '@/components/icons/bitcoin';
import { PaymentMethodButton } from './payment-method-button';
import { useGetCampaign, useCreateDonation } from '@/lib/http/generated';
import type { TranslateFn } from '@/types/i18n';
import { getApiErrorMessage } from '@/lib/utils/get-api-error-message';
import { useSetAtom } from 'jotai';
import { pendingDonationAtom } from '@/atoms/pending-donation';

const createDonateSchema = (t: TranslateFn) =>
  z.object({
    amount: z
      .number({ error: t('validation.amount_required') })
      .min(100, t('validation.amount_min')),
    name: z
      .string()
      .min(1, t('validation.name_required')),
    email: z
      .string()
      .min(1, t('validation.email_required'))
      .email(t('validation.email_invalid')),
    taxId: z
      .string()
      .min(1, t('validation.tax_id_required'))
      .refine((val) => val.replace(/\D/g, '').length === 11, {
        message: t('validation.tax_id_invalid'),
      }),
    phone: z
      .string()
      .min(1, t('validation.phone_required')),
    paymentMethod: z.enum(['pix', 'credit_card', 'boleto'], {
      error: t('validation.payment_method_required'),
    }),
    anonymous: z.boolean(),
  });

type DonateFormData = z.infer<ReturnType<typeof createDonateSchema>>;

export const DonateForm = () => {
  const t = useTranslations('donate');
  const params = useParams<{ campaign: string }>();
  const router = useRouter();
  const setPendingDonation = useSetAtom(pendingDonationAtom);

  const { data: campaign } = useGetCampaign(params.campaign);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DonateFormData>({
    resolver: zodResolver(createDonateSchema(t)),
    defaultValues: {
      amount: 0,
      name: '',
      email: '',
      taxId: '',
      phone: '',
      paymentMethod: 'pix',
      anonymous: false,
    },
  });

  const createDonation = useCreateDonation();

  const quickAmounts = [
    { value: 1000, label: 'R$ 10' },
    { value: 3000, label: 'R$ 30' },
    { value: 5000, label: 'R$ 50' },
    { value: 10000, label: 'R$ 100' },
    { value: 20000, label: 'R$ 200' },
    { value: 50000, label: 'R$ 500' },
  ];

  const onSubmit = async (data: DonateFormData) => {
    setSubmitError(null);

    const phoneDigits = data.phone.replace(/\D/g, '');
    const cleanPhone = phoneDigits.startsWith('55')
      ? phoneDigits.slice(2)
      : phoneDigits;

    try {
      const result = await createDonation.mutateAsync({
        data: {
          amount: data.amount,
          anonymousDonation: data.anonymous,
          campaignId: campaign?.id ?? null,
          donor: {
            name: data.name,
            email: data.email,
            taxId: data.taxId.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
            phoneNumber: cleanPhone,
          },
          paymentMethod: data.paymentMethod,
        },
      });

      const { donation, payment } = result;

      if (payment?.pixCode) {
        setPendingDonation({
          pixCode: payment.pixCode,
          qrCodeUrl: payment.qrCodeUrl,
        });
      }

      const searchParams = new URLSearchParams({
        ref: donation?.externalReference ?? '',
        method: data.paymentMethod,
        amount: String(data.amount),
      });

      if (data.paymentMethod === 'credit_card') {
        searchParams.set('status', 'paid');
      }

      router.push(`/thank-you?${searchParams.toString()}`);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, t('submit_error')));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1">
      {submitError && (
        <div className="p-4 rounded-lg bg-danger-50 border border-danger-200">
          <p className="text-sm text-danger">{submitError}</p>
        </div>
      )}

      {/* Amount Selection Card */}
      <Card className="p-6 md:p-8 border border-default-200 overflow-hidden relative" shadow="none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-10" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon icon="solar:wallet-money-bold" width={24} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{t('amount_title')}</h2>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {quickAmounts.map((amount) => (
            <Button
              key={amount.value}
              type="button"
              variant={selectedQuickAmount === amount.value ? 'solid' : 'bordered'}
              color={selectedQuickAmount === amount.value ? 'primary' : 'default'}
              className={`font-semibold h-14 ${
                selectedQuickAmount === amount.value
                  ? 'shadow-lg shadow-primary/30'
                  : 'border-default-300 hover:border-primary'
              }`}
              onPress={() => {
                setSelectedQuickAmount(amount.value);
                setValue('amount', amount.value, { shouldValidate: true });
              }}
            >
              {amount.label}
            </Button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div>
          <p className="text-sm font-semibold text-default-700 mb-2">{t('amount_custom')}</p>
          <Input
            type="number"
            placeholder="0,00"
            value={selectedQuickAmount ? '' : watch('amount') ? String(watch('amount') / 100) : ''}
            onValueChange={(value) => {
              const cents = Math.round(parseFloat(value || '0') * 100);
              setValue('amount', cents, { shouldValidate: true });
              setSelectedQuickAmount(null);
            }}
            startContent={
              <span className="text-default-600 font-semibold">R$</span>
            }
            size="lg"
            isInvalid={!!errors.amount}
            errorMessage={errors.amount?.message}
            classNames={{
              input: 'text-lg font-semibold',
              inputWrapper: 'border-2 border-default-300 hover:border-primary data-[focus=true]:border-primary',
            }}
          />
        </div>

        {/* Impact Message */}
        <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <div className="flex items-start gap-3">
            <Icon icon="solar:check-circle-bold" width={24} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-900 text-sm mb-1">{t('impact_title')}</p>
              <p className="text-xs text-emerald-700 leading-relaxed">
                {t('impact_description')}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Data Card */}
      <Card className="p-6 md:p-8 border border-default-200" shadow="none">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon icon="solar:user-bold" width={24} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{t('personal_info_title')}</h2>
        </div>

        <div className="space-y-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t('full_name_label')}
                placeholder={t('full_name_placeholder')}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                startContent={
                  <Icon icon="solar:user-linear" className="text-default-400" width={20} />
                }
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t('email_label')}
                placeholder={t('email_placeholder')}
                type="email"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                startContent={
                  <Icon icon="solar:letter-linear" className="text-default-400" width={20} />
                }
              />
            )}
          />

          <Controller
            name="taxId"
            control={control}
            render={({ field }) => (
              <PatternFormat
                format="###.###.###-##"
                mask="_"
                customInput={Input}
                label={t('tax_id_label')}
                placeholder={t('tax_id_placeholder')}
                value={field.value}
                onValueChange={(values) => {
                  field.onChange(values.value);
                }}
                isInvalid={!!errors.taxId}
                errorMessage={errors.taxId?.message}
                startContent={
                  <Icon icon="solar:document-linear" className="text-default-400" width={20} />
                }
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
                  onChange={(value) => field.onChange(value || '')}
                  inputComponent={Input}
                  countryCallingCodeEditable={false}
                  label={t('phone_label')}
                />
                {errors.phone && (
                  <p className="text-xs text-danger mt-1">{errors.phone.message}</p>
                )}
              </div>
            )}
          />

          {/* Anonymous Donation */}
          <Controller
            name="anonymous"
            control={control}
            render={({ field }) => (
              <div className="mt-6 p-4 rounded-xl border border-default-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:incognito-bold" width={24} className="text-default-600" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">{t('anonymous_title')}</p>
                      <p className="text-xs text-default-600 mt-0.5">{t('anonymous_description')}</p>
                    </div>
                  </div>
                  <Switch
                    size="lg"
                    isSelected={field.value}
                    onValueChange={field.onChange}
                  />
                </div>
              </div>
            )}
          />
        </div>
      </Card>

      {/* Payment Methods Card */}
      <Card className="p-6 md:p-8 border border-default-200" shadow="none">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon icon="solar:card-bold" width={24} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{t('payment_method_title')}</h2>
        </div>

        <p className="text-sm text-default-600 mb-4 font-medium">{t('payment_method_subtitle')}</p>

        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                <PaymentMethodButton
                  icon={<PixIcon width={28} height={28} />}
                  title={t('payment_pix')}
                  isSelected={field.value === 'pix'}
                  onSelect={() => field.onChange('pix')}
                />
                <PaymentMethodButton
                  icon={<CreditCardIcon width={28} height={28} />}
                  title={t('payment_card')}
                  isSelected={field.value === 'credit_card'}
                  onSelect={() => field.onChange('credit_card')}
                />
                <PaymentMethodButton
                  icon={<BarcodeIcon width={28} height={28} />}
                  title={t('payment_bank_slip')}
                  isSelected={field.value === 'boleto'}
                  onSelect={() => field.onChange('boleto')}
                />
                <PaymentMethodButton
                  icon={<BitcoinIcon height={28} width={28} />}
                  title={t('payment_bitcoin')}
                  isSelected={false}
                  disabled
                />
                <PaymentMethodButton
                  icon={<PayPalIcon width={28} height={28} />}
                  title={t('payment_paypal')}
                  isSelected={false}
                  disabled
                />
              </div>
              {errors.paymentMethod && (
                <p className="text-xs text-danger mt-2">{errors.paymentMethod.message}</p>
              )}
            </div>
          )}
        />

        {/* Security Badge */}
        <div className="mt-6 flex items-center gap-2 text-xs text-default-600 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
          <Icon icon="solar:shield-check-bold" width={20} className="text-emerald-600" />
          <span className="font-medium">{t('secure_transaction')}</span>
        </div>
      </Card>

      {/* Submit Card */}
      <Card className="p-6 md:p-8 border-2 border-primary/20" shadow="none">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button
            type="submit"
            color="primary"
            size="lg"
            isLoading={isSubmitting}
            className="font-bold text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 w-full sm:w-auto px-12"
            startContent={!isSubmitting && <Icon icon="solar:heart-bold" width={24} />}
          >
            {t('complete_button')}
          </Button>

          <p className="text-xs text-default-600 leading-relaxed">
            {t('terms_text')}{' '}
            <a href="#" className="text-primary hover:underline font-medium">{t('terms_link')}</a>
            {' '}{t('terms_and')}{' '}
            <a href="#" className="text-primary hover:underline font-medium">{t('privacy_link')}</a>.
          </p>
        </div>
      </Card>
    </form>
  );
};
