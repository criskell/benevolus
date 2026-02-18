'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { formatMoney } from '@/lib/utils/format-money';
import type { CartItem } from '@/models/cart';

type DonationSummaryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
};

const DonationSummaryModal = ({
  isOpen,
  onClose,
  cartItems,
}: DonationSummaryModalProps) => {
  const t = useTranslations('campaigns.distribute');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      classNames={{
        backdrop: 'bg-black/50 backdrop-blur-sm',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 border-b border-default-200">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Icon
              icon="solar:document-text-bold"
              width={28}
              className="text-primary"
            />
            {t('summary.title')}
          </h3>
        </ModalHeader>
        <ModalBody className="py-6">
          <div className="text-center mb-6">
            <p className="text-sm text-default-600 mb-3 font-medium">
              {t('summary.qr_code_label')}
            </p>
            <div className="w-48 h-48 bg-gradient-to-br from-default-100 to-default-200 mx-auto flex items-center justify-center rounded-2xl border-2 border-dashed border-default-300">
              <div className="text-center">
                <Icon
                  icon="solar:qr-code-bold"
                  width={64}
                  className="text-default-400 mx-auto mb-2"
                />
                <span className="text-xs text-default-500 font-medium">
                  {t('summary.qr_code_placeholder')}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-default-50 border border-default-200 rounded-2xl p-4 mb-4">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <Icon
                icon="solar:list-bold"
                width={20}
                className="text-primary"
              />
              {t('summary.your_donations')}
            </h4>
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-white border border-default-200 rounded-xl"
                >
                  <span className="text-sm font-semibold text-foreground truncate mr-3">
                    {item.title}
                  </span>
                  <span className="text-base font-bold text-primary whitespace-nowrap">
                    {formatMoney(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground">
                {t('summary.total_to_pay')}
              </span>
              <span className="text-3xl font-black bg-gradient-to-br from-primary to-primary-600 bg-clip-text text-transparent">
                {formatMoney(
                  cartItems.reduce((sum, item) => sum + item.amount, 0)
                )}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-default-600">
            <Icon
              icon="solar:info-circle-bold"
              width={18}
              className="text-primary"
            />
            <span>{t('summary.receipt_info')}</span>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DonationSummaryModal;
