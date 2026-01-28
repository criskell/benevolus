'use client';

import { Drawer, DrawerContent, DrawerHeader, DrawerBody, Button, Card, CardBody, Image, Input } from '@heroui/react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useDonationContext } from '@/contexts/DonationContext';
import { formatMoney } from '@/lib/utils/format-money';
import { AutoSplitWizard } from './auto-split-wizard';
import { CheckoutModal } from './checkout-modal';

type DonationCartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const DonationCartDrawer = ({ isOpen, onClose }: DonationCartDrawerProps) => {
  const { cart, favorites } = useDonationContext();
  const [autoSplitOpen, setAutoSplitOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleAutoSplit = () => {
    setAutoSplitOpen(true);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Lista de Doações</h3>
            <Button isIconOnly variant="light" onPress={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DrawerHeader>
        <DrawerBody>
          {cart.cart.length === 0 ? (
            <p className="text-center text-gray-500">Lista vazia.</p>
          ) : (
            <div className="space-y-4">
              {cart.cart.map((item, index) => (
                <Card key={item.slug}>
                  <CardBody className="p-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm line-clamp-2">{item.title}</h4>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => cart.updateQuantity(index, Math.max(0, item.amount - 100))}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            type="number"
                            value={(item.amount / 100).toString()}
                            onChange={(e) => cart.updateQuantity(index, parseFloat(e.target.value) * 100 || 0)}
                            className="w-20"
                            size="sm"
                          />
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => cart.updateQuantity(index, item.amount + 100)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatMoney(item.amount)}
                        </p>
                      </div>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        onPress={() => cart.removeFromCart(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
              <div className="border-t pt-4">
                <p className="font-semibold">Total: {formatMoney(cart.getTotal())}</p>
                <div className="flex space-x-2 mt-4">
                  <Button
                    color="primary"
                    onPress={handleAutoSplit}
                    disabled={favorites.favorites.length <= 1}
                  >
                    Distribuir Automaticamente
                  </Button>
                  <Button variant="bordered" onPress={() => setCheckoutOpen(true)}>
                    Finalizar Doação
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DrawerBody>
      </DrawerContent>
      <AutoSplitWizard
        isOpen={autoSplitOpen}
        onClose={() => setAutoSplitOpen(false)}
      />
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </Drawer>
  );
};