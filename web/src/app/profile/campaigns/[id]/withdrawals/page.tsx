'use client';

import { use, useState } from 'react';
import { Button, Card, CardBody, Input, Select, SelectItem, Chip } from '@heroui/react';
import { ArrowLeft, Wallet, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

import { ProfileSidebar } from '../../../profile-sidebar';
import { formatMoney } from '@/lib/utils/format-money';

type PixKeyType = 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';
type WithdrawalStatus = 'pending' | 'paid' | 'failed';

type Withdrawal = {
  id: string;
  amountCents: number;
  pixKey: string;
  pixKeyType: PixKeyType;
  status: WithdrawalStatus;
  createdAt: string;
  paidAt: string | null;
};

const pixKeyTypeLabels: Record<PixKeyType, string> = {
  cpf: 'CPF',
  cnpj: 'CNPJ',
  email: 'E-mail',
  phone: 'Telefone',
  random: 'Chave aleatória',
};

const statusConfig: Record<WithdrawalStatus, { label: string; color: 'warning' | 'success' | 'danger'; icon: typeof Clock }> = {
  pending: { label: 'Processando', color: 'warning', icon: Clock },
  paid: { label: 'Pago', color: 'success', icon: CheckCircle },
  failed: { label: 'Falhou', color: 'danger', icon: XCircle },
};

const WithdrawalsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  const availableBalanceCents = 380000;

  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([
    {
      id: '1',
      amountCents: 50000,
      pixKey: '123.456.789-00',
      pixKeyType: 'cpf',
      status: 'paid',
      createdAt: '2025-01-10T10:00:00',
      paidAt: '2025-01-10T10:05:00',
    },
    {
      id: '2',
      amountCents: 20000,
      pixKey: '123.456.789-00',
      pixKeyType: 'cpf',
      status: 'pending',
      createdAt: '2025-01-14T15:30:00',
      paidAt: null,
    },
  ]);

  const [isRequesting, setIsRequesting] = useState(false);
  const [formData, setFormData] = useState({
    amountCents: 0,
    pixKey: '',
    pixKeyType: 'cpf' as PixKeyType,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleRequest = async () => {
    if (formData.amountCents <= 0 || !formData.pixKey.trim()) return;
    if (formData.amountCents > availableBalanceCents) return;

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const withdrawal: Withdrawal = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      paidAt: null,
    };

    setWithdrawals([withdrawal, ...withdrawals]);
    setFormData({ amountCents: 0, pixKey: '', pixKeyType: 'cpf' });
    setIsRequesting(false);
    setIsSaving(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const menuItems = [
    { label: 'Informações pessoais', active: false },
    { label: 'Comunicação', active: false },
    { label: 'Configurações', active: false },
  ];

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar
          userName={userData.name}
          followedCampaigns={userData.followedCampaigns}
          donationsCount={userData.donationsCount}
          menuItems={menuItems}
        />

        <main className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <Button
              as={Link}
              href={`/profile/campaigns/${id}`}
              variant="light"
              isIconOnly
              size="sm"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">Saques</h1>
              <p className="text-sm text-default-500">
                Solicite a transferência dos valores arrecadados.
              </p>
            </div>
          </div>

          <Card className="bg-success-50 border-success-200">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-success-700">Saldo disponível para saque</p>
                  <p className="text-3xl font-bold text-success-700">
                    {formatMoney(availableBalanceCents)}
                  </p>
                </div>
                {!isRequesting && availableBalanceCents > 0 && (
                  <Button
                    color="success"
                    startContent={<Wallet size={18} />}
                    onPress={() => setIsRequesting(true)}
                  >
                    Solicitar saque
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>

          {isRequesting && (
            <Card>
              <CardBody className="p-6 space-y-4">
                <h3 className="font-semibold">Solicitar saque</h3>

                <Input
                  type="number"
                  label="Valor do saque"
                  placeholder="0,00"
                  value={formData.amountCents ? (formData.amountCents / 100).toString() : ''}
                  onValueChange={(value) => setFormData({ ...formData, amountCents: Math.round(parseFloat(value || '0') * 100) })}
                  startContent={<span className="text-default-400 text-sm">R$</span>}
                  isRequired
                  max={availableBalanceCents / 100}
                  description={`Máximo: ${formatMoney(availableBalanceCents)}`}
                />

                <Select
                  label="Tipo de chave PIX"
                  selectedKeys={[formData.pixKeyType]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as PixKeyType;
                    if (selected) setFormData({ ...formData, pixKeyType: selected });
                  }}
                >
                  <SelectItem key="cpf">CPF</SelectItem>
                  <SelectItem key="cnpj">CNPJ</SelectItem>
                  <SelectItem key="email">E-mail</SelectItem>
                  <SelectItem key="phone">Telefone</SelectItem>
                  <SelectItem key="random">Chave aleatória</SelectItem>
                </Select>

                <Input
                  label="Chave PIX"
                  placeholder={
                    formData.pixKeyType === 'cpf' ? '000.000.000-00' :
                    formData.pixKeyType === 'cnpj' ? '00.000.000/0000-00' :
                    formData.pixKeyType === 'email' ? 'email@exemplo.com' :
                    formData.pixKeyType === 'phone' ? '(11) 99999-9999' :
                    'Chave aleatória'
                  }
                  value={formData.pixKey}
                  onValueChange={(value) => setFormData({ ...formData, pixKey: value })}
                  isRequired
                />

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="flat"
                    onPress={() => {
                      setIsRequesting(false);
                      setFormData({ amountCents: 0, pixKey: '', pixKeyType: 'cpf' });
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    isLoading={isSaving}
                    onPress={handleRequest}
                    isDisabled={formData.amountCents <= 0 || !formData.pixKey.trim() || formData.amountCents > availableBalanceCents}
                  >
                    Solicitar
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-4">Histórico de saques</h3>

            {withdrawals.length === 0 ? (
              <Card>
                <CardBody className="text-center py-8">
                  <p className="text-default-500">Nenhum saque realizado ainda.</p>
                </CardBody>
              </Card>
            ) : (
              <Card>
                <CardBody className="p-0">
                  <div className="divide-y divide-default-100">
                    {withdrawals.map((withdrawal) => {
                      const status = statusConfig[withdrawal.status];
                      const StatusIcon = status.icon;

                      return (
                        <div key={withdrawal.id} className="flex items-center gap-4 p-4">
                          <div className={`p-2 rounded-full bg-${status.color}-100`}>
                            <StatusIcon size={20} className={`text-${status.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">{formatMoney(withdrawal.amountCents)}</p>
                            <p className="text-sm text-default-500">
                              {pixKeyTypeLabels[withdrawal.pixKeyType]}: {withdrawal.pixKey}
                            </p>
                            <p className="text-xs text-default-400">
                              Solicitado em {formatDate(withdrawal.createdAt)}
                            </p>
                          </div>
                          <Chip size="sm" color={status.color} variant="flat">
                            {status.label}
                          </Chip>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WithdrawalsPage;
