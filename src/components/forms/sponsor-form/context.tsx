import React, { createContext, useContext, useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { useFormStorage } from './hooks/use-form-storage';
import { FormContextType, SponsorFormData, FormStep } from './types';
import { stepValidationSchemas } from './schema';

const FormContext = createContext<FormContextType | undefined>(undefined);

export const steps: FormStep[] = [
  {
    id: 1,
    title: "Company Information",
    description: "Tell us about your company",
    fields: ['companyName', 'industry', 'website', 'companySize', 'contactName', 'contactPosition', 'contactEmail', 'contactPhone'],
    validationSchema: stepValidationSchemas[1]
  },
  {
    id: 2,
    title: "Sponsorship Details",
    description: "Choose your sponsorship package",
    fields: ['sponsorshipLevel', 'marketingGoals', 'targetAudience', 'previousExperience'],
    validationSchema: stepValidationSchemas[2]
  },
  {
    id: 3,
    title: "Additional Requirements",
    description: "Upload your brand assets",
    fields: ['logoFile', 'brandGuidelinesFile', 'specialRequirements', 'paymentMethod'],
    validationSchema: stepValidationSchemas[3]
  }
];

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
      const zodError = error as z.ZodError;
      zodError.errors.forEach(err => {
        form.setError(err.path[0] as any, {
          type: 'manual',
          message: err.message
        });
      });
      return false;
    }
  };

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
      nextStep: async () => {
        const isValid = await validateCurrentStep();
        if (isValid && currentStep < steps.length) {
          setCurrentStep(prev => prev + 1);
          document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
        }
      },
      prevStep: () => {
        if (currentStep > 1) {
          setCurrentStep(prev => prev - 1);
          document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' });
        }
      },
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
        // Progress is automatically saved by useFormStorage
        toast({
          title: 'Progress Saved',
          description: 'Your form progress has been saved automatically.'
        });
      }
    },
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