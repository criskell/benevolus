import { Chip } from '@heroui/react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

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
    icon: <ArrowUpRight size={18} className="text-danger" />,
  },
  donation_received: {
    label: 'Doação recebida',
    color: 'text-success',
    icon: <ArrowDownLeft size={18} className="text-success" />,
  },
  withdrawal: {
    label: 'Saque',
    color: 'text-primary',
    icon: <ArrowUpRight size={18} className="text-primary" />,
  },
  refund: {
    label: 'Estorno',
    color: 'text-warning',
    icon: <ArrowDownLeft size={18} className="text-warning" />,
  },
};

const statusConfig = {
  completed: { label: 'Concluída', color: 'success' as const },
  pending: { label: 'Pendente', color: 'warning' as const },
  failed: { label: 'Falhou', color: 'danger' as const },
};

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

type TransactionItemProps = {
  transaction: Transaction;
};

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const config = transactionConfig[transaction.type];
  const statusInfo = statusConfig[transaction.status];
  const isOutgoing = transaction.type === 'donation_made' || transaction.type === 'withdrawal';

  return (
    <div className="p-4 hover:bg-default-50 transition-colors">
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
                {isOutgoing ? '-' : '+'}{formatMoney(transaction.amountCents)}
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
};

export { TransactionItem, type Transaction, type TransactionType };
