import { UseFormReturn } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { SponsorFormData } from './types';

export const useFormActions = (
  form: UseFormReturn<SponsorFormData>,
  currentStep: number,
  setCurrentStep: (step: number) => void,
  validateCurrentStep: () => Promise<boolean>,
  clearStorage: () => void,
  totalSteps: number
) => {
  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const setStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const resetForm = () => {
    form.reset();
    setCurrentStep(1);
    clearStorage();
  };

  const saveProgress = () => {
    toast({
      title: 'Progress Saved',
      description: 'Your form progress has been saved automatically.'
    });
  };

  return {
    nextStep,
    prevStep,
    setStep,
    resetForm,
    saveProgress
  };
};