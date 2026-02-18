'use client';

import { useState } from 'react';
import { Progress, Button, Card, CardBody } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Step1BasicInfo } from './basic-info';
import { Step2ConfirmData } from './confirm-data';
import { Step3CampaignDetails } from './campaign-details';
import { Step4CampaignHistory } from './campaign-history';
import { Step5CampaignImage } from './campaign-image';
import { Step6CampaignSuccess } from './campaign-success';
import { Step7CampaignConfirmation } from './campaign-confirmation';

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

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            title={formData.title}
            goalCents={formData.goalCents}
            onTitleChange={(value) => setFormData({ ...formData, title: value })}
            onGoalCentsChange={(value) => setFormData({ ...formData, goalCents: value })}
          />
        );
      case 2:
        return (
          <Step2ConfirmData
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
          <Step3CampaignDetails
            beneficiaryType={formData.beneficiaryType}
            category={formData.category}
            onBeneficiaryTypeChange={(value) => setFormData({ ...formData, beneficiaryType: value })}
            onCategoryChange={(value) => setFormData({ ...formData, category: value })}
          />
        );
      case 4:
        return (
          <Step4CampaignHistory
            history={formData.history}
            onHistoryChange={(value) => setFormData({ ...formData, history: value })}
          />
        );
      case 5:
        return (
          <Step5CampaignImage
            image={formData.image}
            onImageChange={(file) => setFormData({ ...formData, image: file })}
          />
        );
      case 6:
        return (
          <Step6CampaignSuccess
            campaignTitle={formData.title}
            campaignGoal={formData.goalCents}
          />
        );
      case 7:
        return (
          <Step7CampaignConfirmation
            campaignTitle={formData.title}
          />
        );
      default:
        return (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-default-500">
              Step {currentStep} content
            </p>
          </div>
        );
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
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
      return true; // Image is optional
    }
    if (currentStep === 6 || currentStep === 7) {
      return true; // Confirmation steps
    }
    return true;
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

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-default-500">
              {t('step_label', { current: currentStep, total: TOTAL_STEPS })}
            </span>
          </div>
          <Progress value={progress} className="w-full" color="primary" />
        </div>

        <Card className="shadow-lg">
          <CardBody className="p-10">
            <div className="min-h-[400px] flex flex-col">
              <div className="flex-1 py-4">
                {renderStepContent()}
              </div>

              <div className="flex justify-between mt-10 pt-6 border-t border-divider">
                <Button
                  variant="light"
                  onPress={handlePrevious}
                  isDisabled={currentStep === 1}
                >
                  {t('previous_button')}
                </Button>
                <Button
                  color="primary"
                  onPress={handleNext}
                  isDisabled={currentStep === TOTAL_STEPS || !isStepValid()}
                >
                  {currentStep === TOTAL_STEPS ? t('finish_button') : t('next_button')}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CreateCampaignPage;

