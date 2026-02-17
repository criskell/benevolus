'use client';

import { use, useState } from 'react';
import { Button, Card, CardBody, Chip, Tabs, Tab, Select, SelectItem } from '@heroui/react';
import { ArrowLeft, Download, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';
import Link from 'next/link';

import { ProfileSidebar } from '../../../components/profile-sidebar';
import { formatMoney } from '@/lib/utils/format-money';

type TransactionType = 'donation' | 'withdrawal' | 'fee' | 'refund';

type Transaction = {
  id: string;
  type: TransactionType;
  description: string;
  amountCents: number;
  balanceCents: number;
  createdAt: string;
  status: 'completed' | 'pending' | 'failed';
  metadata?: {
    donorName?: string;
    pixKey?: string;
    transactionId?: string;
  };
};

const transactionConfig: Record<TransactionType, { label: string; color: string; icon: React.ReactNode }> = {
  donation: { 
    label: 'Doação recebida', 
    color: 'text-success', 
    icon: <ArrowDownLeft size={18} className="text-success" /> 
  },
  withdrawal: { 
    label: 'Saque', 
    color: 'text-danger', 
    icon: <ArrowUpRight size={18} className="text-danger" /> 
  },
  fee: { 
    label: 'Taxa', 
    color: 'text-warning', 
    icon: <TrendingDown size={18} className="text-warning" /> 
  },
  refund: { 
    label: 'Estorno', 
    color: 'text-primary', 
    icon: <TrendingUp size={18} className="text-primary" /> 
  },
};

const statusConfig = {
  completed: { label: 'Concluída', color: 'success' as const },
  pending: { label: 'Pendente', color: 'warning' as const },
  failed: { label: 'Falhou', color: 'danger' as const },
};

const CampaignStatementPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<'all' | TransactionType>('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  const campaignTitle = 'Ajuda para Maria reconstruir sua casa';
  const currentBalanceCents = 450000;

  // Mock de transações
  const allTransactions: Transaction[] = [
    {
      id: '1',
      type: 'donation',
      description: 'Doação via Pix',
      amountCents: 10000,
      balanceCents: 450000,
      createdAt: '2025-02-08T10:30:00',
      status: 'completed',
      metadata: { donorName: 'João Silva', transactionId: 'PIX-123456' },
    },
    {
      id: '2',
      type: 'donation',
      description: 'Doação via Cartão de Crédito',
      amountCents: 5000,
      balanceCents: 440000,
      createdAt: '2025-02-07T15:45:00',
      status: 'completed',
      metadata: { donorName: 'Doador Anônimo', transactionId: 'CC-789012' },
    },
    {
      id: '3',
      type: 'withdrawal',
      description: 'Saque via Pix',
      amountCents: -150000,
      balanceCents: 435000,
      createdAt: '2025-02-06T09:20:00',
      status: 'completed',
      metadata: { pixKey: '***-***-***-**', transactionId: 'WD-345678' },
    },
    {
      id: '4',
      type: 'donation',
      description: 'Doação via Pix',
      amountCents: 25000,
      balanceCents: 585000,
      createdAt: '2025-02-05T14:10:00',
      status: 'completed',
      metadata: { donorName: 'Maria Santos', transactionId: 'PIX-901234' },
    },
    {
      id: '5',
      type: 'fee',
      description: 'Taxa de processamento',
      amountCents: -500,
      balanceCents: 560000,
      createdAt: '2025-02-05T14:10:00',
      status: 'completed',
      metadata: { transactionId: 'FEE-567890' },
    },
    {
      id: '6',
      type: 'donation',
      description: 'Doação via Boleto',
      amountCents: 20000,
      balanceCents: 560500,
      createdAt: '2025-02-04T11:00:00',
      status: 'completed',
      metadata: { donorName: 'Pedro Oliveira', transactionId: 'BOL-112233' },
    },
    {
      id: '7',
      type: 'withdrawal',
      description: 'Saque via Pix',
      amountCents: -100000,
      balanceCents: 540500,
      createdAt: '2025-02-03T16:30:00',
      status: 'completed',
      metadata: { pixKey: '***-***-***-**', transactionId: 'WD-445566' },
    },
    {
      id: '8',
      type: 'donation',
      description: 'Doação via Pix',
      amountCents: 15000,
      balanceCents: 640500,
      createdAt: '2025-02-02T08:15:00',
      status: 'completed',
      metadata: { donorName: 'Ana Costa', transactionId: 'PIX-778899' },
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
      donation: 0,
      withdrawal: 0,
      fee: 0,
      refund: 0,
    };
    
    allTransactions.forEach(t => {
      totals[t.type]++;
    });
    
    return totals;
  };

  const totals = getTotals();

  const calculateSummary = () => {
    let totalIn = 0;
    let totalOut = 0;
    
    allTransactions.forEach(t => {
      if (t.amountCents > 0) {
        totalIn += t.amountCents;
      } else {
        totalOut += Math.abs(t.amountCents);
      }
    });
    
    return { totalIn, totalOut };
  };

  const { totalIn, totalOut } = calculateSummary();

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
              <h1 className="text-2xl font-semibold">Extrato da Campanha</h1>
              <p className="text-sm text-default-500 mt-1">{campaignTitle}</p>
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
            <Card>
              <CardBody className="p-4">
                <p className="text-sm text-default-500 mb-1">Saldo atual</p>
                <p className="text-2xl font-bold text-primary">{formatMoney(currentBalanceCents)}</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-4">
                <p className="text-sm text-default-500 mb-1">Total recebido</p>
                <p className="text-2xl font-bold text-success">{formatMoney(totalIn)}</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-4">
                <p className="text-sm text-default-500 mb-1">Total sacado</p>
                <p className="text-2xl font-bold text-danger">{formatMoney(totalOut)}</p>
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
              key="donation"
              title={
                <div className="flex items-center gap-2">
                  Doações
                  <Chip size="sm" variant="flat" color="success">{totals.donation}</Chip>
                </div>
              }
            />
            <Tab
              key="withdrawal"
              title={
                <div className="flex items-center gap-2">
                  Saques
                  <Chip size="sm" variant="flat" color="danger">{totals.withdrawal}</Chip>
                </div>
              }
            />
            <Tab
              key="fee"
              title={
                <div className="flex items-center gap-2">
                  Taxas
                  <Chip size="sm" variant="flat" color="warning">{totals.fee}</Chip>
                </div>
              }
            />
          </Tabs>

          {/* Lista de transações */}
          {filteredTransactions.length === 0 ? (
            <Card>
              <CardBody className="p-12 text-center">
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
                                  {transaction.amountCents > 0 ? '+' : ''}{formatMoney(transaction.amountCents)}
                                </p>
                                <p className="text-xs text-default-400">
                                  Saldo: {formatMoney(transaction.balanceCents)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-default-400">
                                {formatDate(transaction.createdAt)}
                              </span>
                              <Chip size="sm" color={statusInfo.color} variant="flat">
                                {statusInfo.label}
                              </Chip>
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

export default CampaignStatementPage;
