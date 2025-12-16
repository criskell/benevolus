'use client';

import { useState } from 'react';
import { Button, Card, CardBody, Input } from '@heroui/react';
import { X } from 'lucide-react';
import { PatternFormat } from 'react-number-format';
import NextLink from 'next/link';
import { ProfileSidebar } from '../../components/profile-sidebar';

export default function AddCardPage() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
  });

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

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
          <Card className="border border-divider" shadow="none">
            <CardBody className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold">Novo cartão</h1>
                <Button
                  isIconOnly
                  variant="light"
                  radius="full"
                  as={NextLink}
                  href="/profile/cards"
                >
                  <X size={20} />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <PatternFormat
                  format="#### #### #### ####"
                  mask="_"
                  customInput={Input}
                  label="Número do cartão"
                  labelPlacement="outside-top"
                  placeholder="0000 0000 0000 0000"
                  value={formData.cardNumber}
                  onValueChange={(values) => updateField('cardNumber', values.value)}
                />

                <Input
                  label="Nome do titular"
                  labelPlacement="outside-top"
                  value={formData.cardholderName}
                  onChange={(e) => updateField('cardholderName', e.target.value)}
                />

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    variant="light"
                    as={NextLink}
                    href="/profile/cards"
                    className="text-default-600"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" color="primary">
                    Salvar
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </main>
      </div>
    </div>
  );
}
