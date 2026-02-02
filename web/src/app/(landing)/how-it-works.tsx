'use client';

import { Icon } from '@iconify/react';

const steps = [
  {
    icon: 'solar:notebook-outline',
    title: 'Crie sua campanha',
    description: 'Conte sua história e defina sua meta de arrecadação',
  },
  {
    icon: 'solar:share-outline',
    title: 'Compartilhe',
    description: 'Divulgue para amigos, família e redes sociais',
  },
  {
    icon: 'solar:wallet-money-outline',
    title: 'Receba as doações',
    description: 'Acompanhe o progresso e receba o valor arrecadado',
  },
];

export function HowItWorks() {
  return (
    <section className="w-full py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Como funciona</h2>
        <p className="text-default-500 text-lg">
          Três passos simples para realizar seu projeto
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-primary-50 rounded-full p-6 mb-4">
              <Icon
                icon={step.icon}
                className="text-primary"
                width={48}
                height={48}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-default-500">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
