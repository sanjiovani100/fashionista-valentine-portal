import React, { createContext, useContext, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useFormStorage } from '../hooks/useFormStorage';
import { FormContextType, SponsorFormData } from '../types';
import { steps } from './steps';
import { useFormStep } from '../hooks/useFormStep';

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{
  children: React.ReactNode;
  form: UseFormReturn<SponsorFormData>;
}> = ({ children, form }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { clearStorage } = useFormStorage(form);
  const { 
    currentStep, 
    setCurrentStep,
    nextStep,
    prevStep,
    validateCurrentStep,
    validateStep
  } = useFormStep(form, steps.length);

  const progress = (currentStep / steps.length) * 100;

  const contextValue: FormContextType = {
    form,
    currentStep,
    isSubmitting,
    progress,
    steps,
    formState: {
      isDirty: form.formState.isDirty,
      isValid: form.formState.isValid,
      errors: form.formState.errors,
    },
    actions: {
      nextStep,
      prevStep,
      setStep: (step: number) => {
        if (step >= 1 && step <= steps.length) {
          setCurrentStep(step);
        }
      },
      resetForm: () => {
        form.reset();
        setCurrentStep(1);
        clearStorage();
      },
      saveProgress: () => {
        // Auto-save is handled by useFormStorage
      }
    },
    navigation: {
      canGoNext: currentStep < steps.length,
      canGoPrev: currentStep > 1,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === steps.length
    },
    validation: {
      validateCurrentStep,
      validateStep
    }
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};