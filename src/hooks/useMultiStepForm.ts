import { useState } from 'react';

export const useMultiStepForm = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep(step => Math.min(step + 1, totalSteps - 1));
  };

  const back = () => {
    setCurrentStep(step => Math.max(step - 1, 0));
  };

  return {
    currentStep,
    next,
    back,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
  };
};