'use client';

import { useState } from 'react';
import { Card, CardBody, Button, Select, SelectItem } from '@heroui/react';
import { Download, Filter, Receipt } from 'lucide-react';

import { ProfileSidebar } from '../profile-sidebar';
import { StatementSummary } from './statement-summary';
import { StatementTabs } from './statement-tabs';
import { TransactionItem, type Transaction, type TransactionType } from './transaction-item';

const UserStatementPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | TransactionType>('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  // Mock de transações globais do usuário
  const allTransactions: Transaction[] = [
    {
      id: '1',
      type: 'donation_made',
      description: 'Doação via Pix',
      amountCents: 5000,
      createdAt: '2025-02-08T10:30:00',
      status: 'completed',
      metadata: {
        campaignTitle: 'Tratamento do João - Luta contra o câncer',
        campaignSlug: 'tratamento-joao',
        transactionId: 'DON-123456'
      },
    },
    {
      id: '2',
      type: 'donation_received',
      description: 'Doação recebida via Cartão',
      amountCents: 10000,
      createdAt: '2025-02-07T15:45:00',
      status: 'completed',
      metadata: {
        campaignTitle: 'Ajuda para Maria reconstruir sua casa',
        campaignSlug: 'ajuda-maria',
        donorName: 'João Silva',
        transactionId: 'REC-789012'
      },
    },
    {
      id: '3',
      type: 'donation_made',
      description: 'Doação via Cartão de Crédito',
      amountCents: 10000,
      createdAt: '2025-02-06T09:20:00',
      status: 'completed',
      metadata: {
        campaignTitle: 'Reforma da escola comunitária',
        campaignSlug: 'reforma-escola',
        transactionId: 'DON-345678'
      },
    },
    {
      id: '4',
      type: 'withdrawal',
      description: 'Saque via Pix',
      amountCents: 150000,
      createdAt: '2025-02-05T14:10:00',
      status: 'completed',
      metadata: {
        campaignTitle: 'Ajuda para Maria reconstruir sua casa',
        campaignSlug: 'ajuda-maria',
        pixKey: '***-***-***-**',
        transactionId: 'WD-901234'
      },
    },
    {
      id: '5',
      type: 'donation_received',
      description: 'Doação recebida via Pix',
      amountCents: 25000,
      createdAt: '2025-02-04T11:00:00',
      status: 'completed',
      metadata: {
        campaignTitle: 'Ajuda para Maria reconstruir sua casa',
        campaignSlug: 'ajuda-maria',
        donorName: 'Maria Santos',
        transactionId: 'REC-567890'
      },
    },
    {
      id: '6',
      type: 'donation_made',
      description: 'Doação via Pix',
      amountCents: 2000,
      createdAt: '2025-02-03T16:30:00',
      status: 'completed',
      metadata: {
        campaignTitle: 'Campanha de natal para famílias carentes',
        campaignSlug: 'natal-familias',
        transactionId: 'DON-112233'
      },
    },
    {
      id: '7',
      type: 'donation_received',
      description: 'Doação recebida via Boleto',
      amountCents: 20000,
      createdAt: '2025-02-02T08:15:00',
      status: 'completed',
      metadata: {
        campaignTitle: 'Ajuda para Maria reconstruir sua casa',
        campaignSlug: 'ajuda-maria',
        donorName: 'Pedro Oliveira',
        transactionId: 'REC-445566'
      },
    },
    {
      id: '8',
      type: 'donation_made',
      description: 'Doação via Cartão',
      amountCents: 15000,
      createdAt: '2025-02-01T12:45:00',
      status: 'completed',
      metadata: {
        campaignTitle: 'Ajuda para animais abandonados',
        campaignSlug: 'animais-abandonados',
        transactionId: 'DON-778899'
      },
    },
    {
      id: '9',
      type: 'donation_received',
      description: 'Doação recebida via Pix',
      amountCents: 8000,
      createdAt: '2025-01-31T19:20:00',
      status: 'completed',
      metadata: {
        campaignTitle: 'Ajuda para Maria reconstruir sua casa',
        campaignSlug: 'ajuda-maria',
        donorName: 'Doador Anônimo',
        transactionId: 'REC-998877'
      },
    },
    {
      id: '10',
      type: 'donation_made',
      description: 'Doação via Pix',
      amountCents: 5000,
      createdAt: '2025-01-30T10:00:00',
      status: 'completed',
      metadata: {
        campaignTitle: 'Projeto educacional para crianças',
        campaignSlug: 'projeto-educacional',
        transactionId: 'DON-665544'
      },
    },
  ];

  const filteredTransactions = activeTab === 'all'
    ? allTransactions
    : allTransactions.filter(t => t.type === activeTab);

  const totals = allTransactions.reduce(
    (acc, t) => {
      acc[t.type]++;
      return acc;
    },
    { all: allTransactions.length, donation_made: 0, donation_received: 0, withdrawal: 0, refund: 0 },
  );

  const { totalDonated, totalReceived, totalWithdrawn } = allTransactions.reduce(
    (acc, t) => {
      if (t.type === 'donation_made') acc.totalDonated += t.amountCents;
      else if (t.type === 'donation_received') acc.totalReceived += t.amountCents;
      else if (t.type === 'withdrawal') acc.totalWithdrawn += t.amountCents;
      return acc;
    },
    { totalDonated: 0, totalReceived: 0, totalWithdrawn: 0 },
  );

  const handleExport = () => {
    alert('Exportação em desenvolvimento');
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar
          userName={userData.name}
          followedCampaigns={userData.followedCampaigns}
          donationsCount={userData.donationsCount}
        />

        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Extrato de Transações</h1>
              <p className="text-sm text-default-500">
                Histórico completo de doações feitas e recebidas
              </p>
            </div>
            <Button
              variant="flat"
              startContent={<Download size={18} />}
              onPress={handleExport}
            >
              Exportar
            </Button>
          </div>

          <StatementSummary
            totalDonatedCents={totalDonated}
            totalReceivedCents={totalReceived}
            totalWithdrawnCents={totalWithdrawn}
            donationsMade={totals.donation_made}
            donationsReceived={totals.donation_received}
            withdrawalsCount={totals.withdrawal}
          />

          <div className="flex flex-wrap gap-3 items-center">
            <Select
              label="Período"
              selectedKeys={[selectedPeriod]}
              onSelectionChange={(keys) => setSelectedPeriod(Array.from(keys)[0] as string)}
              className="max-w-xs"
              size="sm"
              startContent={<Filter size={16} />}
            >
              <SelectItem key="7">Últimos 7 dias</SelectItem>
              <SelectItem key="15">Últimos 15 dias</SelectItem>
              <SelectItem key="30">Últimos 30 dias</SelectItem>
              <SelectItem key="90">Últimos 90 dias</SelectItem>
              <SelectItem key="180">Últimos 6 meses</SelectItem>
              <SelectItem key="365">Último ano</SelectItem>
              <SelectItem key="all">Todo o período</SelectItem>
            </Select>
          </div>

          <StatementTabs activeTab={activeTab} onTabChange={setActiveTab} totals={totals} />

          {filteredTransactions.length === 0 ? (
            <Card>
              <CardBody className="p-12 text-center">
                <Receipt size={48} className="mx-auto mb-4 text-default-300" />
                <p className="text-default-500 text-lg">
                  Nenhuma transação encontrada para este período.
                </p>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody className="p-0">
                <div className="divide-y divide-divider">
                  {filteredTransactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserStatementPage;
