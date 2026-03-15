'use client';

import { useState } from 'react';
import { Progress, Button, Card, CardBody } from '@heroui/react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
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

const TOTAL_STEPS = 7;

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
  const [currentStep, setCurrentStep] = useState(1);
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

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const submitCampaign = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await getCsrfToken();

      if (formData.fullName && formData.password) {
        await register({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.passwordConfirmation,
        });
      }

      const campaign = await createCampaign({
        title: formData.title,
        description: formData.history,
        goalCents: formData.goalCents,
        expiresAt: formData.expiresAt,
      });

      if (formData.image && campaign?.id) {
        await uploadCampaignImage(campaign.id, {
          image: formData.image,
        });
      }

      setCreatedCampaign(campaign);
      setCurrentStep(6);
    } catch {
      setSubmitError(t('submit_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.title.trim() || formData.goalCents < 100) {
        return;
      }
    }

    if (currentStep === 2) {
      const cpfDigits = formData.cpf.replace(/\D/g, '');
      if (cpfDigits.length !== 11 || !formData.email.trim() || !formData.email.includes('@')) {
        return;
      }
      if (formData.fullName || formData.phone || formData.password) {
        if (!formData.fullName.trim() || !formData.phone || !formData.password || formData.password !== formData.passwordConfirmation) {
          return;
        }
      }
    }

    if (currentStep === 3) {
      if (!formData.beneficiaryType || !formData.category) {
        return;
      }
    }

    if (currentStep === 4) {
      if (!formData.history.trim()) {
        return;
      }
    }

    if (currentStep === 5) {
      submitCampaign();
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfo
            title={formData.title}
            goalCents={formData.goalCents}
            onTitleChange={(value) => setFormData({ ...formData, title: value })}
            onGoalCentsChange={(value) => setFormData({ ...formData, goalCents: value })}
          />
        );
      case 2:
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
      case 3:
        return (
          <CampaignDetails
            beneficiaryType={formData.beneficiaryType}
            category={formData.category}
            onBeneficiaryTypeChange={(value) => setFormData({ ...formData, beneficiaryType: value })}
            onCategoryChange={(value) => setFormData({ ...formData, category: value })}
          />
        );
      case 4:
        return (
          <CampaignHistory
            history={formData.history}
            onHistoryChange={(value) => setFormData({ ...formData, history: value })}
          />
        );
      case 5:
        return (
          <CampaignImage
            image={formData.image}
            onImageChange={(file) => setFormData({ ...formData, image: file })}
          />
        );
      case 6:
        return (
          <CampaignSuccess
            campaignTitle={createdCampaign?.title ?? formData.title}
            campaignGoal={formData.goalCents}
            campaignId={createdCampaign?.id}
            campaignStatus={createdCampaign?.status}
          />
        );
      case 7:
        return (
          <CampaignConfirmation
            campaignTitle={createdCampaign?.title ?? formData.title}
            campaignId={createdCampaign?.id}
          />
        );
      default:
        return null;
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1 && currentStep <= 5) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.title.trim() && formData.goalCents >= 100;
    }
    if (currentStep === 2) {
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
    if (currentStep === 3) {
      return formData.beneficiaryType !== '' && formData.category !== '';
    }
    if (currentStep === 4) {
      return formData.history.trim() !== '';
    }
    if (currentStep === 5) {
      return true;
    }
    if (currentStep === 6 || currentStep === 7) {
      return true;
    }
    return true;
  };

  const isPostSubmission = currentStep >= 6;

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

        {!isPostSubmission && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-default-500">
                {t('step_label', { current: currentStep, total: 5 })}
              </span>
            </div>
            <Progress value={(currentStep / 5) * 100} className="w-full" color="primary" />
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

              {!isPostSubmission && (
                <div className="flex justify-between mt-10 pt-6 border-t border-divider">
                  <Button
                    variant="light"
                    onPress={handlePrevious}
                    isDisabled={currentStep === 1 || isSubmitting}
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
                      : currentStep === 5
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

