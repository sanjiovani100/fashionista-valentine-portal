import React, { createContext, useContext, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useFormStorage } from '../hooks/use-form-storage';
import { FormContextType, SponsorFormData } from './types';
import { steps } from './steps';
import { useFormActions } from './useFormActions';

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{
  children: React.ReactNode;
  form: UseFormReturn<SponsorFormData>;
}> = ({ children, form }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { clearStorage } = useFormStorage(form);

  const currentStepData = steps[currentStep - 1];
  const progress = (currentStep / steps.length) * 100;

  const validateCurrentStep = async () => {
    const currentFields = currentStepData.fields;
    const currentValues = form.getValues();
    const stepData = Object.fromEntries(
      currentFields.map(field => [field, currentValues[field]])
    );

    try {
      await currentStepData.validationSchema.parseAsync(stepData);
      return true;
    } catch (error) {
      const zodError = error as any;
      zodError.errors.forEach((err: any) => {
        form.setError(err.path[0] as any, {
          type: 'manual',
          message: err.message
        });
      });
      return false;
    }
  };

  const actions = useFormActions(
    form,
    currentStep,
    setCurrentStep,
    validateCurrentStep,
    clearStorage,
    steps.length
  );

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
    actions,
    navigation: {
      canGoNext: currentStep < steps.length,
      canGoPrev: currentStep > 1,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === steps.length
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