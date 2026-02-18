'use client';

import { useState } from 'react';
import {
  Button,
  Input,
  Card,
  CardBody,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { formatMoney } from '@/lib/utils/format-money';
import type { useCart } from '@/hooks/use-cart';

type CartSidebarProps = {
  cart: ReturnType<typeof useCart>;
  onCheckout: () => void;
};

const CartSidebar = ({ cart, onCheckout }: CartSidebarProps) => {
  const t = useTranslations('campaigns.distribute');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedAmount, setEditedAmount] = useState(0);

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border border-default-200" shadow="none">
            <CardBody className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Icon
                  icon="solar:cart-large-2-bold"
                  width={24}
                  className="text-primary"
                />
                {t('cart.title')}
              </h3>

              {cart.cart.length === 0 ? (
                <div className="text-center py-8">
                  <Icon
                    icon="solar:cart-large-minimalistic-bold"
                    width={64}
                    className="text-default-300 mx-auto mb-3"
                  />
                  <p className="text-default-500 text-sm">
                    {t('cart.empty_message')}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                    {cart.cart.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 bg-default-50 border border-default-200 rounded-xl"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-semibold text-foreground flex-1 mr-2 line-clamp-2">
                            {item.title}
                          </p>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => cart.removeFromCart(index)}
                          >
                            <Icon
                              icon="solar:trash-bin-minimalistic-bold"
                              width={18}
                            />
                          </Button>
                        </div>
                        {editingIndex === index ? (
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              value={editedAmount.toString()}
                              onValueChange={(value) =>
                                setEditedAmount(parseFloat(value) || 0)
                              }
                              min="0.01"
                              step="0.01"
                              size="sm"
                              startContent={
                                <span className="text-xs">R$</span>
                              }
                            />
                            <Button
                              size="sm"
                              color="primary"
                              onPress={() => {
                                cart.updateQuantity(
                                  index,
                                  editedAmount * 100
                                );
                                setEditingIndex(null);
                              }}
                            >
                              ✓
                            </Button>
                            <Button
                              size="sm"
                              variant="flat"
                              onPress={() => setEditingIndex(null)}
                            >
                              ✕
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-base font-black text-primary">
                              {formatMoney(item.amount)}
                            </span>
                            <Button
                              size="sm"
                              variant="flat"
                              startContent={
                                <Icon icon="solar:pen-bold" width={14} />
                              }
                              onPress={() => {
                                setEditingIndex(index);
                                setEditedAmount(item.amount / 100);
                              }}
                            >
                              {t('cart.edit_button')}
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-default-200 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-default-700">
                        {t('cart.total_label')}
                      </span>
                      <span className="text-2xl font-black bg-gradient-to-br from-primary to-primary-600 bg-clip-text text-transparent">
                        {formatMoney(
                          cart.cart.reduce(
                            (sum, item) => sum + item.amount,
                            0
                          )
                        )}
                      </span>
                    </div>
                  </div>

                  <Button
                    color="primary"
                    size="lg"
                    className="w-full font-bold shadow-lg shadow-primary/30"
                    startContent={
                      <Icon icon="solar:check-circle-bold" width={24} />
                    }
                    onPress={onCheckout}
                  >
                    {t('cart.checkout_button')}
                  </Button>

                  <div className="mt-4 flex items-center gap-2 text-xs text-default-600 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    <Icon
                      icon="solar:shield-check-bold"
                      width={18}
                      className="text-emerald-600 flex-shrink-0"
                    />
                    <span className="font-medium">
                      {t('cart.secure_payment')}
                    </span>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CartSidebar;
