'use client';

import { use, useState, useEffect } from 'react';
import { Button, Card, CardBody, Input, Textarea, Spinner } from '@heroui/react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import { useListCampaigns } from '@/lib/http/generated/hooks/useListCampaigns';
import { useGetProfile } from '@/lib/http/generated/hooks/useGetProfile';
import { useUpdateCampaign } from '@/lib/http/generated/hooks/useUpdateCampaign';
import { getCsrfToken } from '@/lib/http/generated';
import { ProfileSidebar } from '../../../profile-sidebar';
import type { MyCampaign } from '../types';

type CampaignFormData = {
  title: string;
  description: string;
  goalCents: number;
};

const EditCampaignPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();

  const { data: profile } = useGetProfile();
  const { data: campaignsResponse, isLoading } = useListCampaigns(
    { userId: profile?.id },
    { query: { enabled: !!profile?.id } },
  );
  const campaign = (campaignsResponse?.data as MyCampaign[] | undefined)?.find(c => String(c.id) === id);
  const { mutate: updateCampaign, isPending: isSaving } = useUpdateCampaign();

  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    description: '',
    goalCents: 0,
  });
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (campaign) {
      setFormData({
        title: campaign.title ?? '',
        description: campaign.description ?? '',
        goalCents: campaign.goalCents ?? 0,
      });
    }
  }, [campaign?.id]);

  const handleChange = (field: keyof CampaignFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);

    await getCsrfToken();

    updateCampaign(
      {
        slug: campaign?.slug ?? '',
        data: {
          title: formData.title,
          description: formData.description,
          goalCents: formData.goalCents,
          status: campaign.status as any,
        },
      },
      {
        onSuccess: () => {
          router.push(`/profile/campaigns/${id}`);
        },
        onError: () => {
          setSaveError('Erro ao salvar alterações. Tente novamente.');
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-[1280px] mx-auto w-full my-10 px-4 flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="max-w-[1280px] mx-auto w-full my-10 px-4 text-center py-20">
        <p className="text-default-500">Campanha não encontrada.</p>
      </div>
    );
  }

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
            <h1 className="text-2xl font-semibold">Editar Campanha</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardBody className="p-6 space-y-6">
                {saveError && (
                  <div className="p-4 rounded-lg bg-danger-50 border border-danger-200">
                    <p className="text-sm text-danger">{saveError}</p>
                  </div>
                )}

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
                  value={(formData.goalCents / 100).toString()}
                  onValueChange={(value) => handleChange('goalCents', Math.round(parseFloat(value || '0') * 100))}
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
