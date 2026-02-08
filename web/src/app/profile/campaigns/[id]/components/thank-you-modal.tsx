'use client';

import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Chip,
} from '@heroui/react';
import { Heart, Sparkles } from 'lucide-react';
import { formatMoney } from '@/lib/utils/format-money';

type ThankYouModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  donorName: string;
  donationAmount: number;
};

const SUGGESTED_MESSAGES = [
  '{nome}, muito obrigado pela sua generosa doação de {valor}! Seu apoio significa o mundo para nós. 💙',
  'Gratidão, {nome}! Sua contribuição de {valor} nos aproxima ainda mais do nosso objetivo. Muito obrigado! 🙏',
  '{nome}, sua doação de {valor} fez toda a diferença! Somos imensamente gratos pelo seu apoio. ❤️',
  'Querido(a) {nome}, obrigado do fundo do coração pela doação de {valor}. Você está ajudando a transformar vidas! 🌟',
];

export const ThankYouModal = ({
  isOpen,
  onClose,
  onSend,
  donorName,
  donationAmount,
}: ThankYouModalProps) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    try {
      await onSend(message);
      setMessage('');
    } finally {
      setIsSending(false);
    }
  };

  const handleUseSuggestion = (suggestion: string) => {
    const formattedMessage = suggestion
      .replace('{nome}', donorName)
      .replace('{valor}', formatMoney(donationAmount));
    setMessage(formattedMessage);
  };

  const handleClose = () => {
    setMessage('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Heart className="text-primary" size={24} />
            <h2 className="text-xl font-semibold">Agradecer Doador</h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-default-600">Doador</p>
                <p className="font-semibold text-lg">{donorName}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-default-600">Valor doado</p>
                <Chip color="success" variant="flat" size="lg">
                  {formatMoney(donationAmount)}
                </Chip>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-warning" />
                <p className="text-sm font-medium text-default-700">
                  Sugestões de mensagem
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_MESSAGES.map((suggestion, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="bordered"
                    className="text-xs"
                    onPress={() => handleUseSuggestion(suggestion)}
                  >
                    Modelo {index + 1}
                  </Button>
                ))}
              </div>
            </div>

            <Textarea
              label="Mensagem de agradecimento"
              placeholder="Escreva uma mensagem personalizada para agradecer este doador..."
              value={message}
              onValueChange={setMessage}
              minRows={6}
              maxRows={10}
              description="Esta mensagem será enviada por e-mail para o doador."
            />

            <div className="bg-default-100 rounded-lg p-3">
              <p className="text-xs text-default-600">
                💡 <strong>Dica:</strong> Mensagens personalizadas fortalecem o vínculo com seus
                doadores e os incentivam a continuar apoiando sua causa.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="light"
            onPress={handleClose}
            disabled={isSending}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            startContent={<Heart size={18} />}
            onPress={handleSend}
            isLoading={isSending}
            isDisabled={!message.trim() || isSending}
          >
            {isSending ? 'Enviando...' : 'Enviar agradecimento'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
