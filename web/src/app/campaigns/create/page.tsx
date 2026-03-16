'use client';

import { useMemo, useState } from 'react';
import { Progress, Button, Card, CardBody } from '@heroui/react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useGetProfile, getProfileQueryKey } from '@/lib/http/generated/hooks/useGetProfile';
import { useQueryClient } from '@tanstack/react-query';
import { BasicInfo } from './basic-info';
import { ConfirmData } from './confirm-data';
import { CampaignDetails } from './campaign-details';
import { CampaignHistory } from './campaign-history';
import { CampaignImage } from './campaign-image';
import { CampaignSuccess } from './campaign-success';
import { CampaignConfirmation } from './campaign-confirmation';
import {
  getCsrfToken,
  register,
  createCampaign,
  uploadCampaignImage,
} from '@/lib/http/generated';
import type { CampaignResource } from '@/lib/http/generated';

type Step = 'basic-info' | 'confirm-data' | 'details' | 'history' | 'image' | 'success' | 'confirmation';

const ALL_STEPS: Step[] = ['basic-info', 'confirm-data', 'details', 'history', 'image', 'success', 'confirmation'];
const AUTHENTICATED_STEPS: Step[] = ['basic-info', 'details', 'history', 'image', 'success', 'confirmation'];

const FORM_STEPS: Record<string, boolean> = {
  'basic-info': true,
  'confirm-data': true,
  'details': true,
  'history': true,
  'image': true,
};

type CampaignFormData = {
  title: string;
  goalCents: number;
  description: string;
  expiresAt: string | null;
  cpf: string;
  email: string;
  fullName: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
  wantsNewsletter: boolean;
  beneficiaryType: string;
  category: string;
  history: string;
  image: File | null;
}

const CreateCampaignPage = () => {
  const t = useTranslations('campaigns.create');
  const queryClient = useQueryClient();
  const { data: profile } = useGetProfile();
  const isAuthenticated = !!profile?.id;

  const steps = useMemo(
    () => (isAuthenticated ? AUTHENTICATED_STEPS : ALL_STEPS),
    [isAuthenticated],
  );

  const formSteps = useMemo(
    () => steps.filter((s) => FORM_STEPS[s]),
    [steps],
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdCampaign, setCreatedCampaign] = useState<CampaignResource | null>(null);
  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    goalCents: 0,
    description: '',
    expiresAt: null,
    cpf: '',
    email: '',
    fullName: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    wantsNewsletter: false,
    beneficiaryType: '',
    category: '',
    history: '',
    image: null,
  });

  const currentStep = steps[stepIndex];
  const isFormStep = FORM_STEPS[currentStep];
  const formStepNumber = isFormStep ? formSteps.indexOf(currentStep) + 1 : 0;
  const totalFormSteps = formSteps.length;
  const isLastFormStep = currentStep === 'image';

  const submitCampaign = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await getCsrfToken();

      if (!isAuthenticated && formData.fullName && formData.password) {
        await register({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.passwordConfirmation,
        });
        await queryClient.invalidateQueries({ queryKey: getProfileQueryKey() });
      }

      const campaign = await createCampaign({
        title: formData.title,
        description: formData.history,
        goalCents: formData.goalCents,
        expiresAt: formData.expiresAt,
      });

      if (formData.image && campaign?.slug) {
        await uploadCampaignImage(campaign.slug, {
          image: formData.image,
        });
      }

      setCreatedCampaign(campaign);
      setStepIndex(steps.indexOf('success'));
    } catch {
      setSubmitError(t('submit_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 'basic-info':
        return !!formData.title.trim() && formData.goalCents >= 100;
      case 'confirm-data': {
        const cpfDigits = formData.cpf.replace(/\D/g, '');
        if (cpfDigits.length !== 11 || !formData.email.trim() || !formData.email.includes('@')) {
          return false;
        }
        if (formData.fullName || formData.phone || formData.password) {
          return (
            formData.fullName.trim() !== '' &&
            formData.phone !== '' &&
            formData.password !== '' &&
            formData.password === formData.passwordConfirmation
          );
        }
        return true;
      }
      case 'details':
        return formData.beneficiaryType !== '' && formData.category !== '';
      case 'history':
        return formData.history.trim() !== '';
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) return;

    if (isLastFormStep) {
      submitCampaign();
      return;
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (stepIndex > 0 && isFormStep) {
      setStepIndex(stepIndex - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic-info':
        return (
          <BasicInfo
            title={formData.title}
            goalCents={formData.goalCents}
            onTitleChange={(value) => setFormData({ ...formData, title: value })}
            onGoalCentsChange={(value) => setFormData({ ...formData, goalCents: value })}
          />
        );
      case 'confirm-data':
        return (
          <ConfirmData
            cpf={formData.cpf}
            email={formData.email}
            fullName={formData.fullName}
            phone={formData.phone}
            password={formData.password}
            passwordConfirmation={formData.passwordConfirmation}
            wantsNewsletter={formData.wantsNewsletter}
            onCpfChange={(value) => setFormData({ ...formData, cpf: value })}
            onEmailChange={(value) => setFormData({ ...formData, email: value })}
            onFullNameChange={(value) => setFormData({ ...formData, fullName: value })}
            onPhoneChange={(value) => setFormData({ ...formData, phone: value })}
            onPasswordChange={(value) => setFormData({ ...formData, password: value })}
            onPasswordConfirmationChange={(value) => setFormData({ ...formData, passwordConfirmation: value })}
            onWantsNewsletterChange={(value) => setFormData({ ...formData, wantsNewsletter: value })}
          />
        );
      case 'details':
        return (
          <CampaignDetails
            beneficiaryType={formData.beneficiaryType}
            category={formData.category}
            onBeneficiaryTypeChange={(value) => setFormData({ ...formData, beneficiaryType: value })}
            onCategoryChange={(value) => setFormData({ ...formData, category: value })}
          />
        );
      case 'history':
        return (
          <CampaignHistory
            history={formData.history}
            onHistoryChange={(value) => setFormData({ ...formData, history: value })}
          />
        );
      case 'image':
        return (
          <CampaignImage
            image={formData.image}
            onImageChange={(file) => setFormData({ ...formData, image: file })}
          />
        );
      case 'success':
        return (
          <CampaignSuccess
            campaignTitle={createdCampaign?.title ?? formData.title}
            campaignGoal={formData.goalCents}
            campaignSlug={createdCampaign?.slug}
            campaignStatus={createdCampaign?.status}
          />
        );
      case 'confirmation':
        return (
          <CampaignConfirmation
            campaignTitle={createdCampaign?.title ?? formData.title}
            campaignSlug={createdCampaign?.slug}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto w-full my-10 px-4">
      <div className="mb-8">
        <Link href="/campaigns">
          <Button
            variant="light"
            startContent={<ArrowLeft className="w-4 h-4" />}
          >
            {t('back_button')}
          </Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            {t('title')} <span className="text-primary">{t('title_highlight')}</span>
          </h1>
          <p className="text-default-500 text-base">
            {t('subtitle')}
          </p>
        </div>

        {isFormStep && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-default-500">
                {t('step_label', { current: formStepNumber, total: totalFormSteps })}
              </span>
            </div>
            <Progress value={(formStepNumber / totalFormSteps) * 100} className="w-full" color="primary" />
          </div>
        )}

        <Card className="shadow-lg">
          <CardBody className="p-10">
            <div className="min-h-[400px] flex flex-col">
              <div className="flex-1 py-4">
                {submitError && (
                  <div className="mb-6 p-4 rounded-lg bg-danger-50 border border-danger-200">
                    <p className="text-sm text-danger">{submitError}</p>
                  </div>
                )}
                {renderStepContent()}
              </div>

              {isFormStep && (
                <div className="flex justify-between mt-10 pt-6 border-t border-divider">
                  <Button
                    variant="light"
                    onPress={handlePrevious}
                    isDisabled={stepIndex === 0 || isSubmitting}
                  >
                    {t('previous_button')}
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleNext}
                    isDisabled={!isStepValid() || isSubmitting}
                    startContent={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
                  >
                    {isSubmitting
                      ? t('submitting_button')
                      : isLastFormStep
                        ? t('create_button')
                        : t('next_button')}
                  </Button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CreateCampaignPage;

