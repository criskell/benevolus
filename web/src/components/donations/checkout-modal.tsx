'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Image, Badge } from '@heroui/react';
import { useDonationContext } from '@/contexts/DonationContext';
import { formatMoney } from '@/lib/utils/format-money';

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const { cart } = useDonationContext();

  const totalAmount = cart.getTotal();
  const fee = Math.round(totalAmount * 0.005); // 0.5% fee
  const finalTotal = totalAmount + fee;

  const handleConfirm = () => {
    // TODO: Integrate with payment gateway
    alert('Doação confirmada! (Integração com gateway de pagamento pendente)');
    cart.clearCart();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-semibold">Resumo da Doação</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Campanhas Selecionadas</h4>
              <div className="space-y-2">
                {cart.cart.map((item) => (
                  <Card key={item.slug}>
                    <CardBody className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span className="text-sm font-medium">{item.title}</span>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatMoney(item.amount)}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal:</span>
                <span>{formatMoney(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Taxa de serviço (0,5%):</span>
                <span>{formatMoney(fee)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total:</span>
                <span>{formatMoney(finalTotal)}</span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Badge color="success" variant="flat">Taxa Fixa 0,5%</Badge>
              </div>
              <p className="text-sm text-green-800">
                Nossa taxa é muito menor que os 6% cobrados pela Vakinha tradicional.
                Todo o valor arrecadado vai diretamente para as campanhas.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Voltar
          </Button>
          <Button color="primary" onPress={handleConfirm}>
            Confirmar Doação
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};