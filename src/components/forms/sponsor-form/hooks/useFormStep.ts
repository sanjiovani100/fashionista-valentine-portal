import { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SponsorFormData } from '../types';
import { stepValidationSchemas } from '../schemas/validationSchemas';

export const useFormStep = (form: UseFormReturn<SponsorFormData>, totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateCurrentStep = async () => {
    const currentSchema = stepValidationSchemas[currentStep];
    const currentValues = form.getValues();

    try {
      await currentSchema.parseAsync(currentValues);
      return true;
    } catch (error: any) {
      error.errors?.forEach((err: any) => {
        form.setError(err.path[0] as any, {
          type: 'manual',
          message: err.message,
        });
      });
      return false;
    }
  };

  const nextStep = useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStep, totalSteps, validateCurrentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStep]);

  return {
    currentStep,
    setCurrentStep,
    isSubmitting,
    setIsSubmitting,
    nextStep,
    prevStep,
    validateCurrentStep,
  };
};