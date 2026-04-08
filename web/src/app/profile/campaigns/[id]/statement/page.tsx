'use client';

import { use, useState } from 'react';
import { Button, Card, CardBody, Chip, Tabs, Tab, Select, SelectItem, Spinner } from '@heroui/react';
import { ArrowLeft, Download, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useQuery } from '@tanstack/react-query';

import { ProfileSidebar } from '../../../profile-sidebar';
import { formatMoney } from '@/lib/utils/format-money';
import { api } from '@/lib/http/api-client';

type TransactionType = 'donation' | 'withdrawal' | 'dispute' | 'adjustment';

type TransactionUser = {
  id: number;
  name: string;
};

type Transaction = {
  id: number;
  campaignId: number;
  userId: number | null;
  type: TransactionType;
  amountCents: number;
  direction: 'input' | 'output';
  createdAt: string;
  updatedAt: string;
  user?: TransactionUser;
};

type TransactionSummary = {
  balanceCents: number;
  totalReceivedCents: number;
  totalWithdrawnCents: number;
};

type TransactionsResponse = {
  summary: TransactionSummary;
  data: Transaction[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
};

const CampaignStatementPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const t = useTranslations('campaigns.statement');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<'all' | TransactionType>('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const { data, isLoading } = useQuery<TransactionsResponse>({
    queryKey: ['campaign-transactions', id, activeTab, selectedPeriod],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (activeTab !== 'all') params.type = activeTab;
      if (selectedPeriod !== 'all') params.period = selectedPeriod;

      const res = await api.get<TransactionsResponse>(`/api/campaigns/${id}/transactions`, { params });
      return res.data;
    },
  });

  const summary = data?.summary;
  const transactions = data?.data ?? [];

  const transactionConfig: Record<TransactionType, { label: string; color: string; icon: React.ReactNode }> = {
    donation: {
      label: t('type_donation'),
      color: 'text-success',
      icon: <ArrowDownLeft size={18} className="text-success" />,
    },
    withdrawal: {
      label: t('type_withdrawal'),
      color: 'text-danger',
      icon: <ArrowUpRight size={18} className="text-danger" />,
    },
    dispute: {
      label: t('type_dispute'),
      color: 'text-warning',
      icon: <TrendingDown size={18} className="text-warning" />,
    },
    adjustment: {
      label: t('type_adjustment'),
      color: 'text-primary',
      icon: <TrendingUp size={18} className="text-primary" />,
    },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleExport = () => {
    alert(t('export_wip'));
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar />

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
              <h1 className="text-2xl font-semibold">{t('title')}</h1>
            </div>
            <Button
              variant="flat"
              startContent={<Download size={18} />}
              onPress={handleExport}
            >
              {t('export')}
            </Button>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardBody className="p-4">
                <p className="text-sm text-default-500 mb-1">{t('current_balance')}</p>
                <p className="text-2xl font-bold text-primary">
                  {summary ? formatMoney(summary.balanceCents) : '—'}
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-4">
                <p className="text-sm text-default-500 mb-1">{t('total_received')}</p>
                <p className="text-2xl font-bold text-success">
                  {summary ? formatMoney(summary.totalReceivedCents) : '—'}
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-4">
                <p className="text-sm text-default-500 mb-1">{t('total_withdrawn')}</p>
                <p className="text-2xl font-bold text-danger">
                  {summary ? formatMoney(summary.totalWithdrawnCents) : '—'}
                </p>
              </CardBody>
            </Card>
          </div>

          {/* Period filter */}
          <div className="flex flex-wrap gap-3 items-center">
            <Select
              label={t('period_label')}
              selectedKeys={[selectedPeriod]}
              onSelectionChange={(keys) => setSelectedPeriod(Array.from(keys)[0] as string)}
              className="max-w-xs"
              size="sm"
              startContent={<Filter size={16} />}
            >
              <SelectItem key="7">{t('period_7')}</SelectItem>
              <SelectItem key="15">{t('period_15')}</SelectItem>
              <SelectItem key="30">{t('period_30')}</SelectItem>
              <SelectItem key="90">{t('period_90')}</SelectItem>
              <SelectItem key="all">{t('period_all')}</SelectItem>
            </Select>
          </div>

          {/* Transaction type tabs */}
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as typeof activeTab)}
          >
            <Tab key="all" title={t('tab_all')} />
            <Tab key="donation" title={t('tab_donation')} />
            <Tab key="withdrawal" title={t('tab_withdrawal')} />
            <Tab key="dispute" title={t('tab_dispute')} />
            <Tab key="adjustment" title={t('tab_adjustment')} />
          </Tabs>

          {/* Transaction list */}
          {isLoading ? (
            <Card>
              <CardBody className="p-12 flex justify-center">
                <Spinner label={t('loading')} />
              </CardBody>
            </Card>
          ) : transactions.length === 0 ? (
            <Card>
              <CardBody className="p-12 text-center">
                <p className="text-default-500 text-lg">
                  {t('empty')}
                </p>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody className="p-0">
                <div className="divide-y divide-divider">
                  {transactions.map((transaction) => {
                    const config = transactionConfig[transaction.type];

                    return (
                      <div key={transaction.id} className="p-4 hover:bg-default-50 transition-colors">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {config.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex-1">
                                <p className="font-semibold text-base">{config.label}</p>
                                {transaction.user && (
                                  <p className="text-sm text-default-500">
                                    {t('donor_label', { name: transaction.user.name })}
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className={`text-lg font-semibold ${config.color}`}>
                                  {transaction.amountCents > 0 ? '+' : ''}{formatMoney(transaction.amountCents)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-default-400">
                                {formatDate(transaction.createdAt)}
                              </span>
                            </div>
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
