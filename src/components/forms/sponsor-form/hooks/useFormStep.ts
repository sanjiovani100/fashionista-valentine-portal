import { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SponsorFormData } from '../types';
import { useFormValidation } from './useFormValidation';
import { steps } from '../context/steps';

export const useFormStep = (form: UseFormReturn<SponsorFormData>, totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { validateStep } = useFormValidation(form);

  const validateCurrentStep = async () => {
    return validateStep(currentStep);
  };

  const nextStep = useCallback(async () => {
    const { isValid } = await validateStep(currentStep);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStep, totalSteps, validateStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStep]);

  return {
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    validateCurrentStep,
    validateStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
  };
};