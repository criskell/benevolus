'use client';

import { Button } from '@heroui/react';
import { Link } from '@heroui/link';
import { CreditCard, Plus } from 'lucide-react';
import NextLink from 'next/link';
import { ProfileSidebar } from '../components/profile-sidebar';

export default function CardsPage() {
  // Dados mockados - serão substituídos por dados reais da API
  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  const menuItems = [
    { label: 'Informações pessoais', active: false },
    { label: 'Comunicação', active: false },
    { label: 'Configurações', active: false },
  ];

  const hasCards = false; // Será substituído por verificação real

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar
          userName={userData.name}
          followedCampaigns={userData.followedCampaigns}
          donationsCount={userData.donationsCount}
          menuItems={menuItems}
        />

        <main className="flex-1">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Meus Cartões</h1>
              <p className="text-sm text-default-500">
                Gerencie seus cartões abaixo.
              </p>
            </div>
            <Button
              color="primary"
              startContent={<Plus size={20} />}
              as={NextLink}
              href="#"
            >
              Adicionar
            </Button>
          </div>

          {!hasCards ? (
            <div className="flex flex-col items-center justify-center py-20">
              {/* Ilustração */}
              <div className="flex items-center justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-default-100 flex items-center justify-center">
                  <CreditCard size={40} className="text-default-400" />
                </div>
              </div>

              {/* Mensagem de estado vazio */}
              <p className="text-default-500 text-center mb-4">
                Você ainda não possui nenhum cartão cadastrado conosco.
              </p>

              {/* Link para adicionar */}
              <Link
                as={NextLink}
                href="#"
                color="primary"
                className="text-primary font-medium cursor-pointer"
              >
                Adicionar cartão
              </Link>
            </div>
          ) : (
            <div>
              {/* Aqui será exibida a lista de cartões quando houver */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
