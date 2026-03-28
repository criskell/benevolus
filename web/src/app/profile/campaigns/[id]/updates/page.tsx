'use client';

import { use, useState } from 'react';
import { Button, Card, CardBody, Input, Textarea, Switch, Chip, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';
import { ArrowLeft, Plus, Trash2, Lock, Globe } from 'lucide-react';
import Link from 'next/link';
import { useListCampaignUpdates } from '@/lib/http/generated/hooks/useListCampaignUpdates';
import { useCreateCampaignUpdate } from '@/lib/http/generated/hooks/useCreateCampaignUpdate';
import { useDeleteCampaignUpdate } from '@/lib/http/generated/hooks/useDeleteCampaignUpdate';
import { listCampaignUpdatesQueryKey } from '@/lib/http/generated/hooks/useListCampaignUpdates';
import { useListCampaigns } from '@/lib/http/generated/hooks/useListCampaigns';
import { useGetProfile } from '@/lib/http/generated/hooks/useGetProfile';
import { getCsrfToken } from '@/lib/http/generated';
import { useQueryClient } from '@tanstack/react-query';
import { ProfileSidebar } from '../../../profile-sidebar';
import type { MyCampaign } from '../types';

const CampaignUpdatesPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const queryClient = useQueryClient();

  const { data: profile } = useGetProfile();
  const { data: campaignsResponse } = useListCampaigns(
    { userId: profile?.id },
    { query: { enabled: !!profile?.id } },
  );
  const campaign = (campaignsResponse?.data as MyCampaign[] | undefined)?.find(c => String(c.id) === id);

  const { data: updatesResponse, isLoading } = useListCampaignUpdates(campaign?.slug ?? '', {
    query: { enabled: !!campaign?.slug },
  });
  const updates = updatesResponse?.data ?? [];

  const { mutate: createUpdate, isPending: isCreating } = useCreateCampaignUpdate();
  const { mutate: deleteUpdate } = useDeleteCampaignUpdate();

  const [showForm, setShowForm] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    title: '',
    content: '',
    visibleToDonorsOnly: false,
  });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const invalidateUpdates = () => {
    if (campaign?.slug) {
      queryClient.invalidateQueries({ queryKey: listCampaignUpdatesQueryKey(campaign.slug) });
    }
  };

  const handleCreate = async () => {
    if (!newUpdate.title.trim() || !newUpdate.content.trim() || !campaign?.slug) return;

    await getCsrfToken();

    createUpdate(
      {
        campaign: campaign.slug,
        data: {
          title: newUpdate.title,
          content: newUpdate.content,
          visibleToDonorsOnly: newUpdate.visibleToDonorsOnly,
        },
      },
      {
        onSuccess: () => {
          invalidateUpdates();
          setNewUpdate({ title: '', content: '', visibleToDonorsOnly: false });
          setShowForm(false);
        },
      },
    );
  };

  const handleDeleteConfirm = async () => {
    if (deleteId === null || !campaign?.slug) return;

    await getCsrfToken();

    deleteUpdate(
      { update: deleteId },
      {
        onSuccess: () => {
          invalidateUpdates();
          onDeleteClose();
          setDeleteId(null);
        },
      },
    );
  };

  const openDeleteModal = (updateId: number) => {
    setDeleteId(updateId);
    onDeleteOpen();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-[1280px] mx-auto w-full my-10 px-4 flex justify-center py-20">
        <Spinner size="lg" />
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
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">Atualizações da Campanha</h1>
              <p className="text-sm text-default-500">
                Mantenha seus doadores informados sobre o progresso.
              </p>
            </div>
            {!showForm && (
              <Button
                color="primary"
                startContent={<Plus size={18} />}
                onPress={() => setShowForm(true)}
              >
                Nova atualização
              </Button>
            )}
          </div>

          {showForm && (
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
                      setShowForm(false);
                      setNewUpdate({ title: '', content: '', visibleToDonorsOnly: false });
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    isLoading={isCreating}
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
                  onPress={() => setShowForm(true)}
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
                          {update.createdAt ? formatDate(update.createdAt) : ''}
                        </p>
                      </div>
                      <Button
                        isIconOnly
                        variant="light"
                        color="danger"
                        size="sm"
                        onPress={() => openDeleteModal(update.id!)}
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

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          <ModalHeader>Confirmar exclusão</ModalHeader>
          <ModalBody>
            <p>Tem certeza que deseja excluir esta atualização? Esta ação não pode ser desfeita.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onDeleteClose}>
              Cancelar
            </Button>
            <Button color="danger" onPress={handleDeleteConfirm}>
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CampaignUpdatesPage;
