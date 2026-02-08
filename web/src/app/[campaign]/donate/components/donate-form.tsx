'use client';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { PatternFormat } from 'react-number-format';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  input,
  Input,
  Switch,
  Chip,
} from '@heroui/react';
import { useId, useState } from 'react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { PixIcon } from '@/components/icons/pix';
import { BarcodeIcon, CreditCardIcon } from 'lucide-react';
import { PayPalIcon } from '@/components/icons/paypal';
import { BitcoinIcon } from '@/components/icons/bitcoin';
import { PaymentMethodButton } from './payment-method-button';

export function DonateForm() {
  const t = useTranslations('donate');
  const phoneInputId = useId();
  const [phone, setPhone] = useState<any>();
  const [country, setCountry] = useState<any>();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const quickAmounts = [
    { value: 10, label: 'R$ 10' },
    { value: 30, label: 'R$ 30' },
    { value: 50, label: 'R$ 50' },
    { value: 100, label: 'R$ 100' },
    { value: 200, label: 'R$ 200' },
    { value: 500, label: 'R$ 500' },
  ];

  return (
    <div className="space-y-6 flex-1">
      {/* Amount Selection Card */}
      <Card className="p-6 md:p-8 border border-default-200 overflow-hidden relative" shadow="none">
        {/* Decorative background */}
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
              variant={selectedAmount === amount.value ? 'solid' : 'bordered'}
              color={selectedAmount === amount.value ? 'primary' : 'default'}
              className={`font-semibold h-14 ${
                selectedAmount === amount.value 
                  ? 'shadow-lg shadow-primary/30' 
                  : 'border-default-300 hover:border-primary'
              }`}
              onPress={() => {
                setSelectedAmount(amount.value);
                setCustomAmount('');
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
            value={customAmount}
            onValueChange={(value) => {
              setCustomAmount(value);
              setSelectedAmount(null);
            }}
            startContent={
              <span className="text-default-600 font-semibold">R$</span>
            }
            size="lg"
            classNames={{
              input: "text-lg font-semibold",
              inputWrapper: "border-2 border-default-300 hover:border-primary data-[focus=true]:border-primary"
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
          <Input 
            label={t('full_name_label')}
            labelPlacement="outside" 
            placeholder={t('full_name_placeholder')}
            size="lg"
            startContent={<Icon icon="solar:user-linear" width={20} className="text-default-400" />}
          />
          
          <Input 
            label={t('email_label')}
            labelPlacement="outside" 
            type="email"
            placeholder={t('email_placeholder')}
            size="lg"
            startContent={<Icon icon="solar:letter-linear" width={20} className="text-default-400" />}
          />

          <PatternFormat
            format="###.###.###-##"
            mask="_"
            customInput={Input}
            label={t('tax_id_label')}
            labelPlacement="outside"
            placeholder={t('tax_id_placeholder')}
            size="lg"
            startContent={<Icon icon="solar:document-linear" width={20} className="text-default-400" />}
          />

          <div>
            <label
              className={input({
                labelPlacement: 'outside',
              }).label()}
              htmlFor={phoneInputId}
            >
              {t('phone_label')}
            </label>

            <PhoneInput
              onChange={(phone) => setPhone(phone)}
              value={phone}
              countryCallingCodeEditable={false}
              inputComponent={Input}
              defaultCountry="BR"
              id={phoneInputId}
              international
            />
          </div>

          <Checkbox size="sm" className="mt-2">
            <span className="text-sm">{t('foreign_checkbox')}</span>
          </Checkbox>

          {/* Anonymous Donation */}
          <div className="mt-6 p-4 rounded-xl border border-default-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon icon="solar:incognito-bold" width={24} className="text-default-600" />
                <div>
                  <p className="font-semibold text-sm text-foreground">{t('anonymous_title')}</p>
                  <p className="text-xs text-default-600 mt-0.5">{t('anonymous_description')}</p>
                </div>
              </div>
              <Switch size="lg" />
            </div>
          </div>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <PaymentMethodButton
            icon={<PixIcon width={28} height={28} />}
            title={t('payment_pix')}
          />
          <PaymentMethodButton
            icon={<CreditCardIcon width={28} height={28} />}
            title={t('payment_card')}
          />
          <PaymentMethodButton
            icon={<BarcodeIcon width={28} height={28} />}
            title={t('payment_bank_slip')}
          />
          <PaymentMethodButton
            icon={<BitcoinIcon height={28} width={28} />}
            title={t('payment_bitcoin')}
          />
          <PaymentMethodButton
            icon={<PayPalIcon width={28} height={28} />}
            title={t('payment_paypal')}
          />
        </div>

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
            color="primary" 
            size="lg"
            className="font-bold text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 w-full sm:w-auto px-12"
            startContent={<Icon icon="solar:heart-bold" width={24} />}
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
    </div>
  );
}
