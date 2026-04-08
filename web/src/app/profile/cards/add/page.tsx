'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
} from '@heroui/react';
import { ArrowLeft, X } from 'lucide-react';
import { PatternFormat } from 'react-number-format';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { ProfileSidebar } from '../../profile-sidebar';
import { useStorePaymentMethod, useCreateTokenizationSession } from '@/lib/http/generated';
import type { TranslateFn } from '@/types/i18n';
import { tokenizeCard } from '@/lib/payment/tokenize';

const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const createAddCardSchema = (t: TranslateFn) =>
  z.object({
    cardNumber: z.string().min(13, t('validation.card_required')),
    holderName: z.string().min(1, t('validation.holder_name_required')),
    expiryDate: z.string().min(4, t('validation.card_required')),
    cvv: z.string().min(3, t('validation.card_required')),
    billingPostalCode: z.string().optional(),
    billingState: z.string().optional(),
    billingCity: z.string().optional(),
    billingNeighborhood: z.string().optional(),
    billingStreet: z.string().optional(),
    billingAddressNumber: z.string().optional(),
    billingComplement: z.string().optional(),
  });

type AddCardFormData = z.infer<ReturnType<typeof createAddCardSchema>>;

function detectCardBrand(number: string): string {
  const clean = number.replace(/\D/g, '');
  if (/^4/.test(clean)) return 'visa';
  if (/^5[1-5]/.test(clean)) return 'mastercard';
  if (/^(636368|438935|504175|451416|636297)/.test(clean)) return 'elo';
  if (/^3[47]/.test(clean)) return 'amex';
  return 'unknown';
}

const AddCardPage = () => {
  const t = useTranslations('cards');
  const router = useRouter();
  const storePaymentMethod = useStorePaymentMethod();
  const createTokenizationSession = useCreateTokenizationSession();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddCardFormData>({
    resolver: zodResolver(createAddCardSchema(t)),
    defaultValues: {
      cardNumber: '',
      holderName: '',
      expiryDate: '',
      cvv: '',
      billingPostalCode: '',
      billingState: '',
      billingCity: '',
      billingNeighborhood: '',
      billingStreet: '',
      billingAddressNumber: '',
      billingComplement: '',
    },
  });

  const onSubmit = async (data: AddCardFormData) => {
    setSubmitError(null);

    const cardNumber = data.cardNumber.replace(/\D/g, '');
    const lastFour = cardNumber.slice(-4);
    const brand = detectCardBrand(cardNumber);
    const [expMonth, expYear] = data.expiryDate.match(/.{1,2}/g) ?? ['', ''];
    const fullExpYear = expYear.length === 2 ? `20${expYear}` : expYear;

    try {
      const session = await createTokenizationSession.mutateAsync();

      const tokenResult = await tokenizeCard(session, {
        cardNumber,
        holderName: data.holderName,
        expMonth,
        expYear: fullExpYear,
        cvv: data.cvv,
      });

      await storePaymentMethod.mutateAsync({
        data: {
          token: tokenResult.token,
          brand,
          lastFour,
          expMonth,
          expYear: fullExpYear,
          holderName: data.holderName,
          gatewayCustomerId: tokenResult.customerId ?? null,
          billingPostalCode: data.billingPostalCode || null,
          billingAddressNumber: data.billingAddressNumber || null,
          billingStreet: data.billingStreet || null,
          billingNeighborhood: data.billingNeighborhood || null,
          billingCity: data.billingCity || null,
          billingState: data.billingState || null,
          billingComplement: data.billingComplement || null,
        },
      });

      router.push('/profile/cards');
    } catch {
      setSubmitError(t('save_error'));
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar />

        <main className="flex-1">
          <Card className="border border-divider" shadow="none">
            <CardBody className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Button
                    variant="light"
                    isIconOnly
                    as={NextLink}
                    href="/profile/cards"
                  >
                    <ArrowLeft size={20} />
                  </Button>
                  <h1 className="text-2xl font-semibold">{t('new_card_title')}</h1>
                </div>
                <Button
                  isIconOnly
                  variant="light"
                  radius="full"
                  as={NextLink}
                  href="/profile/cards"
                >
                  <X size={20} />
                </Button>
              </div>

              {submitError && (
                <div className="p-4 rounded-lg bg-danger-50 border border-danger-200 mb-6">
                  <p className="text-sm text-danger">{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">{t('card_details_title')}</h2>

                  <Controller
                    name="cardNumber"
                    control={control}
                    render={({ field }) => (
                      <PatternFormat
                        format="#### #### #### ####"
                        mask="_"
                        customInput={Input}
                        label={t('card_number_label')}
                        labelPlacement="outside"
                        placeholder={t('card_number_placeholder')}
                        value={field.value}
                        onValueChange={(values) => field.onChange(values.value)}
                        isInvalid={!!errors.cardNumber}
                        errorMessage={errors.cardNumber?.message}
                      />
                    )}
                  />

                  <Controller
                    name="holderName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={t('holder_name_label')}
                        labelPlacement="outside"
                        placeholder={t('holder_name_placeholder')}
                        isInvalid={!!errors.holderName}
                        errorMessage={errors.holderName?.message}
                      />
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="expiryDate"
                      control={control}
                      render={({ field }) => (
                        <PatternFormat
                          format="##/##"
                          mask="_"
                          customInput={Input}
                          label={t('expiry_label')}
                          labelPlacement="outside"
                          placeholder={t('expiry_placeholder')}
                          value={field.value}
                          onValueChange={(values) => field.onChange(values.value)}
                          isInvalid={!!errors.expiryDate}
                          errorMessage={errors.expiryDate?.message}
                        />
                      )}
                    />

                    <Controller
                      name="cvv"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          label={t('cvv_label')}
                          labelPlacement="outside"
                          placeholder={t('cvv_placeholder')}
                          maxLength={4}
                          isInvalid={!!errors.cvv}
                          errorMessage={errors.cvv?.message}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">{t('billing_address_title')}</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="billingPostalCode"
                      control={control}
                      render={({ field }) => (
                        <PatternFormat
                          format="#####-###"
                          mask="_"
                          customInput={Input}
                          label={t('zip_code_label')}
                          labelPlacement="outside"
                          placeholder={t('zip_code_placeholder')}
                          value={field.value}
                          onValueChange={(values) => field.onChange(values.value)}
                        />
                      )}
                    />

                    <Controller
                      name="billingState"
                      control={control}
                      render={({ field }) => (
                        <Select
                          label={t('state_label')}
                          labelPlacement="outside"
                          placeholder={t('state_placeholder')}
                          selectedKeys={field.value ? [field.value] : []}
                          onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0] as string;
                            field.onChange(value || '');
                          }}
                        >
                          {BRAZILIAN_STATES.map((state) => (
                            <SelectItem key={state}>{state}</SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="billingCity"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label={t('city_label')}
                          labelPlacement="outside"
                          placeholder={t('city_placeholder')}
                        />
                      )}
                    />

                    <Controller
                      name="billingNeighborhood"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label={t('neighborhood_label')}
                          labelPlacement="outside"
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name="billingStreet"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={t('street_label')}
                        labelPlacement="outside"
                      />
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="billingAddressNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label={t('number_label')}
                          labelPlacement="outside"
                        />
                      )}
                    />

                    <Controller
                      name="billingComplement"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label={t('complement_label')}
                          labelPlacement="outside"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    variant="light"
                    as={NextLink}
                    href="/profile/cards"
                    className="text-default-600"
                  >
                    {t('cancel_button')}
                  </Button>
                  <Button type="submit" color="primary" isLoading={isSubmitting}>
                    {t('save_button')}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AddCardPage;
