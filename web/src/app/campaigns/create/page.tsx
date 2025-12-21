'use client';

import { useState } from 'react';
import { Progress, Button, Card, CardBody } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Step1BasicInfo } from './components/step1-basic-info';
import { Step2ConfirmData } from './components/step2-confirm-data';
import { Step3CampaignDetails } from './components/step3-campaign-details';

const TOTAL_STEPS = 7;

interface CampaignFormData {
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
}

export default function CreateCampaignPage() {
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
            Voltar
          </Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Comece a criar sua <span className="text-primary">vaquinha</span>
          </h1>
          <p className="text-default-500 text-base">
            Mais de duas mil pessoas escolhem o Benevolus para transformar suas histórias todos os dias.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-default-500">
              Passo {currentStep} de {TOTAL_STEPS}
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
                  Voltar
                </Button>
                <Button
                  color="primary"
                  onPress={handleNext}
                  isDisabled={currentStep === TOTAL_STEPS || !isStepValid()}
                >
                  {currentStep === TOTAL_STEPS ? 'Finalizar' : 'Continuar'}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

