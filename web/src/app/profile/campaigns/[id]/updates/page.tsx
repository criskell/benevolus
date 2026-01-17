'use client';

import { use, useState } from 'react';
import { Button, Card, CardBody, Input, Textarea, Switch, Chip } from '@heroui/react';
import { ArrowLeft, Plus, Trash2, Lock, Globe } from 'lucide-react';
import Link from 'next/link';

import { ProfileSidebar } from '../../../components/profile-sidebar';

type CampaignUpdate = {
  id: string;
  title: string;
  content: string;
  visibleToDonorsOnly: boolean;
  createdAt: string;
};

export default function CampaignUpdatesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const userData = {
    name: 'Cristiano',
    followedCampaigns: 0,
    donationsCount: 3,
  };

  const [updates, setUpdates] = useState<CampaignUpdate[]>([
    {
      id: '1',
      title: 'Chegamos a 45% da meta!',
      content: 'Graças a todos vocês, já arrecadamos quase metade do valor necessário. Maria está muito emocionada com toda essa solidariedade!',
      visibleToDonorsOnly: false,
      createdAt: '2025-01-12T14:30:00',
    },
    {
      id: '2',
      title: 'Fotos do progresso da obra',
      content: 'Compartilhando com vocês as primeiras fotos da reconstrução. O alicerce já está sendo preparado!',
      visibleToDonorsOnly: true,
      createdAt: '2025-01-10T09:00:00',
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    title: '',
    content: '',
    visibleToDonorsOnly: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleCreate = async () => {
    if (!newUpdate.title.trim() || !newUpdate.content.trim()) return;

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const update: CampaignUpdate = {
      id: Date.now().toString(),
      ...newUpdate,
      createdAt: new Date().toISOString(),
    };

    setUpdates([update, ...updates]);
    setNewUpdate({ title: '', content: '', visibleToDonorsOnly: false });
    setIsCreating(false);
    setIsSaving(false);
  };

  const handleDelete = async (updateId: string) => {
    // TODO: Confirmar antes de deletar
    setUpdates(updates.filter((u) => u.id !== updateId));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
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
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">Atualizações da Campanha</h1>
              <p className="text-sm text-default-500">
                Mantenha seus doadores informados sobre o progresso.
              </p>
            </div>
            {!isCreating && (
              <Button
                color="primary"
                startContent={<Plus size={18} />}
                onPress={() => setIsCreating(true)}
              >
                Nova atualização
              </Button>
            )}
          </div>

          {isCreating && (
            <Card>
              <CardBody className="p-6 space-y-4">
                <h3 className="font-semibold">Nova atualização</h3>

                <Input
                  label="Título"
                  placeholder="Ex: Chegamos a 50% da meta!"
                  value={newUpdate.title}
                  onValueChange={(value) => setNewUpdate({ ...newUpdate, title: value })}
                  isRequired
                />

                <Textarea
                  label="Conteúdo"
                  placeholder="Conte as novidades para seus doadores..."
                  value={newUpdate.content}
                  onValueChange={(value) => setNewUpdate({ ...newUpdate, content: value })}
                  minRows={4}
                  isRequired
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      isSelected={newUpdate.visibleToDonorsOnly}
                      onValueChange={(value) => setNewUpdate({ ...newUpdate, visibleToDonorsOnly: value })}
                      size="sm"
                    />
                    <div>
                      <p className="text-sm font-medium">Apenas para doadores</p>
                      <p className="text-xs text-default-500">
                        Só quem doou poderá ver esta atualização
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    variant="flat"
                    onPress={() => {
                      setIsCreating(false);
                      setNewUpdate({ title: '', content: '', visibleToDonorsOnly: false });
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    isLoading={isSaving}
                    onPress={handleCreate}
                    isDisabled={!newUpdate.title.trim() || !newUpdate.content.trim()}
                  >
                    Publicar
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}

          {updates.length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <p className="text-default-500 mb-4">
                  Você ainda não publicou nenhuma atualização.
                </p>
                <Button
                  color="primary"
                  startContent={<Plus size={18} />}
                  onPress={() => setIsCreating(true)}
                >
                  Criar primeira atualização
                </Button>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-4">
              {updates.map((update) => (
                <Card key={update.id}>
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{update.title}</h3>
                          <Chip
                            size="sm"
                            variant="flat"
                            color={update.visibleToDonorsOnly ? 'warning' : 'default'}
                            startContent={update.visibleToDonorsOnly ? <Lock size={12} /> : <Globe size={12} />}
                          >
                            {update.visibleToDonorsOnly ? 'Doadores' : 'Público'}
                          </Chip>
                        </div>
                        <p className="text-default-600 whitespace-pre-line">{update.content}</p>
                        <p className="text-sm text-default-400 mt-3">
                          {formatDate(update.createdAt)}
                        </p>
                      </div>
                      <Button
                        isIconOnly
                        variant="light"
                        color="danger"
                        size="sm"
                        onPress={() => handleDelete(update.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
