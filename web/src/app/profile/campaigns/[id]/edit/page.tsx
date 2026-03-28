'use client';

import { use, useState } from 'react';
import { Button, Card, CardBody, Input, Textarea, Spinner } from '@heroui/react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useListCampaigns } from '@/lib/http/generated/hooks/useListCampaigns';
import { useGetProfile } from '@/lib/http/generated/hooks/useGetProfile';
import { useUpdateCampaign } from '@/lib/http/generated/hooks/useUpdateCampaign';
import { ProfileSidebar } from '../../../profile-sidebar';
import { parseCents } from '@/lib/utils/parse-cents';
import type { TranslateFn } from '@/types/i18n';

const createEditSchema = (t: TranslateFn) =>
  z.object({
    title: z
      .string()
      .min(1, t('validation.title_required'))
      .max(255, t('validation.title_max')),
    description: z.string().min(1, t('validation.description_required')),
    goalCents: z.number().min(100, t('validation.goal_min')),
  });

type EditFormData = z.infer<ReturnType<typeof createEditSchema>>;

const EditCampaignPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();
  const t = useTranslations('campaigns.edit');

  const { data: profile } = useGetProfile();
  const { data: campaignsResponse, isLoading: isCampaignsLoading } = useListCampaigns(
    { userId: profile?.id },
    { query: { enabled: !!profile?.id } },
  );
  const campaigns = campaignsResponse?.data ?? [];
  const campaign = campaigns.find(c => String(c.id) === id);

  const { mutate: updateCampaign, isPending: isSaving } = useUpdateCampaign();
  const [saveError, setSaveError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormData>({
    resolver: zodResolver(createEditSchema(t)),
    values: campaign
      ? {
          title: campaign.title ?? '',
          description: campaign.description ?? '',
          goalCents: campaign.goalCents ?? 0,
        }
      : undefined,
  });

  const onSubmit = (data: EditFormData) => {
    setSaveError(null);

    updateCampaign(
      {
        slug: campaign?.slug ?? '',
        data: {
          title: data.title,
          description: data.description,
          goalCents: data.goalCents,
          status: campaign?.status as any,
        },
      },
      {
        onSuccess: () => {
          router.push(`/profile/campaigns/${id}`);
        },
        onError: () => {
          setSaveError(t('save_error'));
        },
      },
    );
  };

  if (isCampaignsLoading) {
    return (
      <div className="max-w-[1280px] mx-auto w-full my-10 px-4 flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="max-w-[1280px] mx-auto w-full my-10 px-4 text-center py-20">
        <p className="text-default-500">{t('not_found')}</p>
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
            <h1 className="text-2xl font-semibold">{t('title')}</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardBody className="p-6 space-y-6">
                {saveError && (
                  <div className="p-4 rounded-lg bg-danger-50 border border-danger-200">
                    <p className="text-sm text-danger">{saveError}</p>
                  </div>
                )}

                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={t('form_title')}
                      placeholder={t('form_title_placeholder')}
                      isRequired
                      maxLength={255}
                      isInvalid={!!errors.title}
                      errorMessage={errors.title?.message}
                    />
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label={t('form_description')}
                      placeholder={t('form_description_placeholder')}
                      minRows={4}
                      maxRows={8}
                      isRequired
                      isInvalid={!!errors.description}
                      errorMessage={errors.description?.message}
                    />
                  )}
                />

                <Controller
                  name="goalCents"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      label={t('form_goal')}
                      placeholder={t('form_goal_placeholder')}
                      value={(field.value / 100).toString()}
                      onValueChange={(value) => field.onChange(parseCents(value))}
                      startContent={
                        <span className="text-default-400 text-sm">R$</span>
                      }
                      isRequired
                      min={1}
                      isInvalid={!!errors.goalCents}
                      errorMessage={errors.goalCents?.message}
                    />
                  )}
                />

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    as={Link}
                    href={`/profile/campaigns/${id}`}
                    variant="flat"
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isSaving}
                    startContent={!isSaving && <Save size={18} />}
                  >
                    {t('save')}
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
