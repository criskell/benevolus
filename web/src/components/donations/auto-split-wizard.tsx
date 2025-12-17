'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, RadioGroup, Radio, Card, CardBody } from '@heroui/react';
import { useState } from 'react';
import { useDonationContext } from '@/contexts/DonationContext';
import { formatMoney } from '@/lib/utils/format-money';

type AutoSplitWizardProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AutoSplitWizard = ({ isOpen, onClose }: AutoSplitWizardProps) => {
  const { cart, favorites } = useDonationContext();
  const [totalAmount, setTotalAmount] = useState(50); // Default R$50
  const [criteria, setCriteria] = useState<'equal' | 'mixed'>('equal');

  const likedSlugs = favorites.favorites.map(f => f.slug);
  const distribution = cart.autoSplit(totalAmount * 100, likedSlugs, criteria);

  const handleApply = () => {
    // Clear cart and add distributed items
    cart.clearCart();
    distribution.forEach(item => {
      const fav = favorites.favorites.find(f => f.slug === item.slug);
      if (fav) {
        cart.addToCart({
          slug: item.slug,
          title: fav.title,
          image: fav.image,
          amount: item.amount,
        });
      }
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-semibold">Distribuir Doação Automaticamente</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Valor Total a Distribuir (R$)
              </label>
              <Input
                type="number"
                value={totalAmount.toString()}
                onChange={(e) => setTotalAmount(parseFloat(e.target.value) || 0)}
                min="1"
                step="0.01"
                placeholder="50.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Critério de Distribuição
              </label>
              <RadioGroup value={criteria} onValueChange={(value) => setCriteria(value as 'equal' | 'mixed')}>
                <Radio value="equal">
                  <div>
                    <strong>Dividir igualmente</strong>
                    <p className="text-sm text-gray-600">Mesmo valor para todas as campanhas favoritas</p>
                  </div>
                </Radio>
                <Radio value="mixed">
                  <div>
                    <strong>Distribuição inteligente</strong>
                    <p className="text-sm text-gray-600">80% para a principal, 20% dividido entre as outras</p>
                  </div>
                </Radio>
              </RadioGroup>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Prévia da Distribuição</h4>
              <div className="space-y-2">
                {distribution.map((item) => {
                  const fav = favorites.favorites.find(f => f.slug === item.slug);
                  return (
                    <Card key={item.slug}>
                      <CardBody className="py-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{fav?.title}</span>
                          <span className="text-sm font-semibold text-primary">
                            {formatMoney(item.amount)}
                          </span>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Dica:</strong> Doe para múltiplas campanhas e ajude mais causas simultaneamente!
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            onPress={handleApply}
            disabled={distribution.length === 0}
          >
            Aplicar Distribuição
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};