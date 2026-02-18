'use client';

import { use, useState } from 'react';
import { Button, Card, CardBody, Input, Textarea } from '@heroui/react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

import { ProfileSidebar } from '../../../profile-sidebar';

import placeholderImage1 from '@/assets/images/placeholder1.jpg';

type CampaignFormData = {
  title: string;
  description: string;
  goalAmountCents: number;
  image: string;
};

const EditCampaignPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  const [formData, setFormData] = useState<CampaignFormData>({
    title: 'Ajuda para Maria reconstruir sua casa após enchente',
    description: 'Maria perdeu tudo na enchente que atingiu sua cidade. Precisamos ajudá-la a reconstruir sua casa e sua vida. Qualquer ajuda é bem-vinda!',
    goalAmountCents: 1000000,
    image: placeholderImage1.src,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof CampaignFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simula chamada à API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    // TODO: Integrar com API real
  };

  const menuItems = [
    { label: 'Informações pessoais', active: false },
    { label: 'Comunicação', active: false },
    { label: 'Configurações', active: false },
  ];

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="flex gap-8">
        <ProfileSidebar
          userName={userData.name}
          followedCampaigns={userData.followedCampaigns}
          donationsCount={userData.donationsCount}
          menuItems={menuItems}
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
            <h1 className="text-2xl font-semibold">Editar Campanha</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardBody className="p-6 space-y-6">
                <Input
                  label="Título da campanha"
                  placeholder="Ex: Ajuda para reconstruir casa após enchente"
                  value={formData.title}
                  onValueChange={(value) => handleChange('title', value)}
                  isRequired
                  maxLength={100}
                />

                <Textarea
                  label="Descrição"
                  placeholder="Conte a história da campanha e por que as pessoas devem ajudar..."
                  value={formData.description}
                  onValueChange={(value) => handleChange('description', value)}
                  minRows={4}
                  maxRows={8}
                  isRequired
                />

                <Input
                  type="number"
                  label="Meta (R$)"
                  placeholder="10000"
                  value={(formData.goalAmountCents / 100).toString()}
                  onValueChange={(value) => handleChange('goalAmountCents', Math.round(parseFloat(value || '0') * 100))}
                  startContent={
                    <span className="text-default-400 text-sm">R$</span>
                  }
                  isRequired
                  min={100}
                />

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    as={Link}
                    href={`/profile/campaigns/${id}`}
                    variant="flat"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isSaving}
                    startContent={!isSaving && <Save size={18} />}
                  >
                    Salvar alterações
                  </Button>
                </div>
              </CardBody>
            </Card>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditCampaignPage;
