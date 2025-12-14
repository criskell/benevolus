import type { ReactNode } from 'react';

export type PaymentMethodButtonProps = {
  icon: ReactNode;
  title: string;
};

export function PaymentMethodButton({ icon, title }: PaymentMethodButtonProps) {
  return (
    <button className="flex flex-col items-center p-4 rounded-lg border-2 transition-colors border-blue-500 bg-blue-50 w-40 grow">
      {icon}
      <span className="text-sm font-medium text-gray-900 mt-auto">{title}</span>
    </button>
  );
}
