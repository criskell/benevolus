'use client';

import { useState } from 'react';
import { Card, CardBody, Chip, Tabs, Tab, Select, SelectItem, Button } from '@heroui/react';
import { Download, ArrowUpRight, ArrowDownLeft, Filter, Receipt } from 'lucide-react';

import { ProfileSidebar } from '../components/profile-sidebar';
import { formatMoney } from '@/lib/utils/format-money';

type TransactionType = 'donation_made' | 'donation_received' | 'withdrawal' | 'refund';

type Transaction = {
  id: string;
  type: TransactionType;
  description: string;
  amountCents: number;
  createdAt: string;
  status: 'completed' | 'pending' | 'failed';
  metadata?: {
    campaignTitle?: string;
    campaignSlug?: string;
    donorName?: string;
    pixKey?: string;
    transactionId?: string;
  };
};

const transactionConfig: Record<TransactionType, { label: string; color: string; icon: React.ReactNode }> = {
  donation_made: { 
    label: 'Doação realizada', 
    color: 'text-danger', 
    icon: <ArrowUpRight size={18} className="text-danger" /> 
  },
  donation_received: { 
    label: 'Doação recebida', 
    color: 'text-success', 
    icon: <ArrowDownLeft size={18} className="text-success" /> 
  },
  withdrawal: { 
    label: 'Saque', 
    color: 'text-primary', 
    icon: <ArrowUpRight size={18} className="text-primary" /> 
  },
  refund: { 
    label: 'Estorno', 
    color: 'text-warning', 
    icon: <ArrowDownLeft size={18} className="text-warning" /> 
  },
};

const statusConfig = {
  completed: { label: 'Concluída', color: 'success' as const },
  pending: { label: 'Pendente', color: 'warning' as const },
  failed: { label: 'Falhou', color: 'danger' as const },
};

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTotals = () => {
    const totals = {
      all: allTransactions.length,
      donation_made: 0,
      donation_received: 0,
      withdrawal: 0,
      refund: 0,
    };
    
    allTransactions.forEach(t => {
      totals[t.type]++;
    });
    
    return totals;
  };

  const totals = getTotals();

  const calculateSummary = () => {
    let totalDonated = 0;
    let totalReceived = 0;
    let totalWithdrawn = 0;
    
    allTransactions.forEach(t => {
      if (t.type === 'donation_made') {
        totalDonated += t.amountCents;
      } else if (t.type === 'donation_received') {
        totalReceived += t.amountCents;
      } else if (t.type === 'withdrawal') {
        totalWithdrawn += t.amountCents;
      }
    });
    
    return { totalDonated, totalReceived, totalWithdrawn };
  };

  const { totalDonated, totalReceived, totalWithdrawn } = calculateSummary();

  const handleExport = () => {
    // Aqui seria implementada a exportação do extrato
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

          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-danger">
              <CardBody className="p-4">
                <p className="text-sm text-default-500 mb-1">Total doado</p>
                <p className="text-2xl font-bold text-danger">{formatMoney(totalDonated)}</p>
                <p className="text-xs text-default-400 mt-1">
                  {totals.donation_made} doações realizadas
                </p>
              </CardBody>
            </Card>
            <Card className="border-l-4 border-l-success">
              <CardBody className="p-4">
                <p className="text-sm text-default-500 mb-1">Total recebido</p>
                <p className="text-2xl font-bold text-success">{formatMoney(totalReceived)}</p>
                <p className="text-xs text-default-400 mt-1">
                  {totals.donation_received} doações recebidas
                </p>
              </CardBody>
            </Card>
            <Card className="border-l-4 border-l-primary">
              <CardBody className="p-4">
                <p className="text-sm text-default-500 mb-1">Total sacado</p>
                <p className="text-2xl font-bold text-primary">{formatMoney(totalWithdrawn)}</p>
                <p className="text-xs text-default-400 mt-1">
                  {totals.withdrawal} saques realizados
                </p>
              </CardBody>
            </Card>
          </div>

          {/* Filtros */}
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

          {/* Tabs de tipos de transação */}
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as typeof activeTab)}
          >
            <Tab
              key="all"
              title={
                <div className="flex items-center gap-2">
                  Todas
                  <Chip size="sm" variant="flat">{totals.all}</Chip>
                </div>
              }
            />
            <Tab
              key="donation_made"
              title={
                <div className="flex items-center gap-2">
                  Doações feitas
                  <Chip size="sm" variant="flat" color="danger">{totals.donation_made}</Chip>
                </div>
              }
            />
            <Tab
              key="donation_received"
              title={
                <div className="flex items-center gap-2">
                  Doações recebidas
                  <Chip size="sm" variant="flat" color="success">{totals.donation_received}</Chip>
                </div>
              }
            />
            <Tab
              key="withdrawal"
              title={
                <div className="flex items-center gap-2">
                  Saques
                  <Chip size="sm" variant="flat" color="primary">{totals.withdrawal}</Chip>
                </div>
              }
            />
          </Tabs>

          {/* Lista de transações */}
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
                  {filteredTransactions.map((transaction) => {
                    const config = transactionConfig[transaction.type];
                    const statusInfo = statusConfig[transaction.status];
                    
                    return (
                      <div key={transaction.id} className="p-4 hover:bg-default-50 transition-colors">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {config.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex-1">
                                <p className="font-semibold text-base">{transaction.description}</p>
                                {transaction.metadata?.campaignTitle && (
                                  <p className="text-sm text-default-600">
                                    Campanha: {transaction.metadata.campaignTitle}
                                  </p>
                                )}
                                {transaction.metadata?.donorName && (
                                  <p className="text-sm text-default-500">
                                    Doador: {transaction.metadata.donorName}
                                  </p>
                                )}
                                {transaction.metadata?.pixKey && (
                                  <p className="text-sm text-default-500">
                                    Chave Pix: {transaction.metadata.pixKey}
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className={`text-lg font-semibold ${config.color}`}>
                                  {transaction.type === 'donation_made' ? '-' : '+'}{formatMoney(transaction.amountCents)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-default-400">
                                {formatDate(transaction.createdAt)}
                              </span>
                              <div className="flex items-center gap-2">
                                <Chip size="sm" color={statusInfo.color} variant="flat">
                                  {statusInfo.label}
                                </Chip>
                              </div>
                            </div>
                            {transaction.metadata?.transactionId && (
                              <p className="text-xs text-default-400 mt-1">
                                ID: {transaction.metadata.transactionId}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
