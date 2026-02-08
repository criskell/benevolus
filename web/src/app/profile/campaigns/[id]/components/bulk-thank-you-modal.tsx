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
  Checkbox,
  Divider,
  Avatar,
} from '@heroui/react';
import { Heart, Sparkles, Users } from 'lucide-react';
import { formatMoney } from '@/lib/utils/format-money';
import { getUserNameInitials } from '@/lib/utils/get-user-name-initials';

type Donation = {
  id: string;
  donorName: string | null;
  amountCents: number;
  createdAt: string;
};

type BulkThankYouModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string, selectedIds: string[]) => void;
  donations: Donation[];
};

const SUGGESTED_MESSAGES = [
  'Olá {nome}! Muito obrigado pela sua generosa doação de {valor}. Sua contribuição está fazendo toda a diferença em nossa causa! 💙',
  'Querido(a) {nome}, sua doação de {valor} nos encheu de esperança e gratidão. Obrigado por acreditar em nosso projeto! 🙏',
  '{nome}, não temos palavras para agradecer sua doação de {valor}. Você está ajudando a transformar sonhos em realidade! ❤️',
  'Gratidão, {nome}! Sua contribuição de {valor} nos aproxima cada vez mais do nosso objetivo. Seu apoio é fundamental! 🌟',
];

export const BulkThankYouModal = ({
  isOpen,
  onClose,
  onSend,
  donations,
}: BulkThankYouModalProps) => {
  const [message, setMessage] = useState('');
  const [selectedDonations, setSelectedDonations] = useState<Set<string>>(
    new Set(donations.map(d => d.id))
  );
  const [isSending, setIsSending] = useState(false);
  const [usePersonalization, setUsePersonalization] = useState(true);

  const handleSend = async () => {
    if (!message.trim() || selectedDonations.size === 0) return;

    setIsSending(true);
    try {
      await onSend(message, Array.from(selectedDonations));
      setMessage('');
      setSelectedDonations(new Set());
    } finally {
      setIsSending(false);
    }
  };

  const handleUseSuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  const handleClose = () => {
    setMessage('');
    setSelectedDonations(new Set(donations.map(d => d.id)));
    setUsePersonalization(true);
    onClose();
  };

  const handleToggleDonation = (id: string) => {
    setSelectedDonations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    setSelectedDonations(new Set(donations.map(d => d.id)));
  };

  const handleDeselectAll = () => {
    setSelectedDonations(new Set());
  };

  const totalAmount = donations
    .filter(d => selectedDonations.has(d.id))
    .reduce((sum, d) => sum + d.amountCents, 0);

  const getPreviewMessage = (donation: Donation) => {
    if (!usePersonalization || !message.includes('{')) {
      return message;
    }
    return message
      .replace(/{nome}/g, donation.donorName || 'Doador')
      .replace(/{valor}/g, formatMoney(donation.amountCents));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Users className="text-primary" size={24} />
            <h2 className="text-xl font-semibold">Agradecer Múltiplos Doadores</h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            {/* Resumo */}
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-default-600">Doadores selecionados</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="light" onPress={handleSelectAll}>
                    Selecionar todos
                  </Button>
                  <Button size="sm" variant="light" onPress={handleDeselectAll}>
                    Desmarcar todos
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Chip color="primary" variant="flat" size="lg">
                    {selectedDonations.size} de {donations.length}
                  </Chip>
                  <span className="text-sm text-default-600">doadores</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-default-600">Total das doações</p>
                  <Chip color="success" variant="flat" size="lg">
                    {formatMoney(totalAmount)}
                  </Chip>
                </div>
              </div>
            </div>

            {/* Lista de doadores */}
            <div className="border border-divider rounded-lg p-3 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {donations.map((donation) => (
                  <div
                    key={donation.id}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      selectedDonations.has(donation.id)
                        ? 'bg-primary-50'
                        : 'hover:bg-default-100'
                    }`}
                  >
                    <Checkbox
                      isSelected={selectedDonations.has(donation.id)}
                      onValueChange={() => handleToggleDonation(donation.id)}
                    />
                    <Avatar
                      name={donation.donorName || 'D'}
                      getInitials={getUserNameInitials}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {donation.donorName}
                      </p>
                    </div>
                    <Chip size="sm" variant="flat" color="success">
                      {formatMoney(donation.amountCents)}
                    </Chip>
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            {/* Sugestões */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-warning" />
                <p className="text-sm font-medium text-default-700">
                  Sugestões de mensagem personalizada
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
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
              <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <p className="text-xs text-blue-900">
                  💡 Use <code className="bg-blue-100 px-1 rounded">{'{nome}'}</code> e{' '}
                  <code className="bg-blue-100 px-1 rounded">{'{valor}'}</code> para personalizar
                  automaticamente cada mensagem com o nome e valor da doação de cada pessoa.
                </p>
              </div>
              <Checkbox
                isSelected={usePersonalization}
                onValueChange={setUsePersonalization}
              >
                <span className="text-sm">
                  Personalizar mensagem automaticamente para cada doador
                </span>
              </Checkbox>
            </div>

            {/* Editor de mensagem */}
            <Textarea
              label="Mensagem de agradecimento"
              placeholder="Escreva uma mensagem para agradecer todos os doadores selecionados..."
              value={message}
              onValueChange={setMessage}
              minRows={5}
              maxRows={8}
              description={
                usePersonalization && message.includes('{')
                  ? 'A mensagem será personalizada automaticamente para cada doador.'
                  : 'Esta mensagem será enviada para todos os doadores selecionados.'
              }
            />

            {/* Preview */}
            {message && selectedDonations.size > 0 && (
              <div className="border border-divider rounded-lg p-3">
                <p className="text-sm font-medium text-default-700 mb-2">
                  Prévia para {donations.find(d => selectedDonations.has(d.id))?.donorName}:
                </p>
                <div className="bg-default-50 rounded-lg p-3">
                  <p className="text-sm text-default-700 whitespace-pre-wrap">
                    {getPreviewMessage(
                      donations.find(d => selectedDonations.has(d.id))!
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Dica */}
            <div className="bg-default-100 rounded-lg p-3">
              <p className="text-xs text-default-600">
                ⏱️ <strong>Estimativa:</strong> O envio de {selectedDonations.size}{' '}
                {selectedDonations.size === 1 ? 'mensagem' : 'mensagens'} levará aproximadamente{' '}
                {Math.ceil(selectedDonations.size / 10)} segundo(s).
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={handleClose} disabled={isSending}>
            Cancelar
          </Button>
          <Button
            color="primary"
            startContent={<Heart size={18} />}
            onPress={handleSend}
            isLoading={isSending}
            isDisabled={!message.trim() || selectedDonations.size === 0 || isSending}
          >
            {isSending
              ? `Enviando (${selectedDonations.size})...`
              : `Enviar para ${selectedDonations.size} ${selectedDonations.size === 1 ? 'doador' : 'doadores'}`}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
