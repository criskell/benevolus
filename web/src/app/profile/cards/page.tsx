'use client';

import {
  Button,
  Card,
  CardBody,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';
import { Link } from '@heroui/link';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import NextLink from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ProfileSidebar } from '../profile-sidebar';
import {
  useListPaymentMethods,
  useDeletePaymentMethod,
  useSetDefaultPaymentMethod,
} from '@/lib/http/generated';

const CardsPage = () => {
  const t = useTranslations('cards');
  const { data: paymentMethodsResponse, refetch } = useListPaymentMethods();
  const paymentMethods = paymentMethodsResponse?.data;
  const deletePaymentMethod = useDeletePaymentMethod();
  const setDefault = useSetDefaultPaymentMethod();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardToDelete, setCardToDelete] = useState<number | null>(null);

  const cards = paymentMethods ?? [];
  const hasCards = cards.length > 0;

  const handleDelete = async () => {
    if (cardToDelete === null) return;
    try {
      await deletePaymentMethod.mutateAsync({ id: cardToDelete });
      await refetch();
    } catch {
      // error handled silently
    }
    onClose();
    setCardToDelete(null);
  };

  const handleSetDefault = async (id: number) => {
    try {
      await setDefault.mutateAsync({ id });
      await refetch();
    } catch {
      // error handled silently
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar />

        <main className="flex-1">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-2">{t('page_title')}</h1>
              <p className="text-sm text-default-500">{t('page_subtitle')}</p>
            </div>
            <Button
              color="primary"
              startContent={<Plus size={20} />}
              as={NextLink}
              href="/profile/cards/add"
            >
              {t('add_button')}
            </Button>
          </div>

          {!hasCards ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="flex items-center justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-default-100 flex items-center justify-center">
                  <CreditCard size={40} className="text-default-400" />
                </div>
              </div>

              <p className="text-default-500 text-center mb-4">
                {t('empty_description')}
              </p>

              <Link
                as={NextLink}
                href="/profile/cards/add"
                color="primary"
                className="text-primary font-medium cursor-pointer"
              >
                {t('empty_add_link')}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cards.map((card) => (
                <Card key={card.id} className="border border-divider" shadow="none">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-default-100 flex items-center justify-center">
                          <CreditCard size={24} className="text-default-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold capitalize">
                              {card.brand} •••• {card.lastFour}
                            </p>
                            {card.isDefault && (
                              <Chip size="sm" color="primary" variant="flat">
                                {t('default_badge')}
                              </Chip>
                            )}
                          </div>
                          <p className="text-sm text-default-500">
                            {card.holderName} · {t('expires', { month: card.expMonth ?? '', year: card.expYear ?? '' })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!card.isDefault && (
                          <Button
                            size="sm"
                            variant="flat"
                            onPress={() => handleSetDefault(card.id!)}
                            isLoading={setDefault.isPending}
                          >
                            {t('set_default_button')}
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="light"
                          color="danger"
                          isIconOnly
                          onPress={() => {
                            setCardToDelete(card.id!);
                            onOpen();
                          }}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{t('delete_confirm_title')}</ModalHeader>
          <ModalBody>
            <p>{t('delete_confirm_message')}</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              {t('cancel_button')}
            </Button>
            <Button
              color="danger"
              onPress={handleDelete}
              isLoading={deletePaymentMethod.isPending}
            >
              {t('delete_button')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CardsPage;
