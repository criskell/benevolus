'use client';

import { Card, CardBody } from '@heroui/react';
import type { LucideIcon } from 'lucide-react';

type StatsCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  color?: 'default' | 'success' | 'warning' | 'danger';
};

const colorClasses = {
  default: 'text-default-500',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
};

export const StatsCard = ({ icon: Icon, label, value, color = 'default' }: StatsCardProps) => {
  return (
    <Card>
      <CardBody className="flex flex-row items-center gap-4 p-4">
        <div className={`p-2 rounded-lg bg-default-100 ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-sm text-default-500">{label}</p>
          <p className={`text-xl font-semibold ${color !== 'default' ? colorClasses[color] : ''}`}>
            {value}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};
