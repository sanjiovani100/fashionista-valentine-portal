import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { sponsorFormSchema } from './schema';

export type SponsorFormData = z.infer<typeof sponsorFormSchema>;

export interface FormStep {
  id: number;
  title: string;
  description: string;
  fields: (keyof SponsorFormData)[];
  validationSchema: z.ZodObject<any>;
}

export interface FormContextType {
  form: UseFormReturn<SponsorFormData>;
  currentStep: number;
  isSubmitting: boolean;
  progress: number;
  steps: FormStep[];
  formState: {
    isDirty: boolean;
    isValid: boolean;
    errors: Record<string, any>;
  };
  actions: {
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: number) => void;
    resetForm: () => void;
    saveProgress: () => void;
  };
  navigation: {
    canGoNext: boolean;
    canGoPrev: boolean;
    isFirstStep: boolean;
    isLastStep: boolean;
  };
}