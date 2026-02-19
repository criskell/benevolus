import { Card, CardBody } from '@heroui/react';

import { formatMoney } from '@/lib/utils/format-money';

type StatementSummaryProps = {
  totalDonatedCents: number;
  totalReceivedCents: number;
  totalWithdrawnCents: number;
  donationsMade: number;
  donationsReceived: number;
  withdrawalsCount: number;
};

const StatementSummary = ({
  totalDonatedCents,
  totalReceivedCents,
  totalWithdrawnCents,
  donationsMade,
  donationsReceived,
  withdrawalsCount,
}: StatementSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-l-4 border-l-danger">
        <CardBody className="p-4">
          <p className="text-sm text-default-500 mb-1">Total doado</p>
          <p className="text-2xl font-bold text-danger">{formatMoney(totalDonatedCents)}</p>
          <p className="text-xs text-default-400 mt-1">
            {donationsMade} doações realizadas
          </p>
        </CardBody>
      </Card>
      <Card className="border-l-4 border-l-success">
        <CardBody className="p-4">
          <p className="text-sm text-default-500 mb-1">Total recebido</p>
          <p className="text-2xl font-bold text-success">{formatMoney(totalReceivedCents)}</p>
          <p className="text-xs text-default-400 mt-1">
            {donationsReceived} doações recebidas
          </p>
        </CardBody>
      </Card>
      <Card className="border-l-4 border-l-primary">
        <CardBody className="p-4">
          <p className="text-sm text-default-500 mb-1">Total sacado</p>
          <p className="text-2xl font-bold text-primary">{formatMoney(totalWithdrawnCents)}</p>
          <p className="text-xs text-default-400 mt-1">
            {withdrawalsCount} saques realizados
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default StatementSummary;
