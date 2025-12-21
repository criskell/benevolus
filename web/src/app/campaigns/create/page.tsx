'use client';

import { useState } from 'react';
import { Progress, Button, Card, CardBody } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const TOTAL_STEPS = 7;

export default function CreateCampaignPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
            Voltar
          </Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Comece a criar sua vaquinha
          </h1>
          <p className="text-default-500">
            Mais de duas mil pessoas escolhem o Benevolus para transformar suas histórias todos os dias.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-default-500">
              Passo {currentStep} de {TOTAL_STEPS}
            </span>
            <span className="text-sm text-default-500">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        <Card>
          <CardBody className="p-8">
            <div className="min-h-[400px] flex flex-col">
              {/* Conteúdo do step será renderizado aqui */}
              <div className="flex-1 flex items-center justify-center">
                <p className="text-default-500">
                  Step {currentStep} content
                </p>
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-divider">
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
                  isDisabled={currentStep === TOTAL_STEPS}
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

