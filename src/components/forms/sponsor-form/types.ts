import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { sponsorFormSchema } from './schemas/validationSchemas';

export type SponsorFormData = z.infer<typeof sponsorFormSchema>;

export interface FormStep {
  id: number;
  title: string;
  description: string;
  fields: (keyof SponsorFormData)[];
  validationSchema: z.ZodObject<any>;
}

export interface FormState {
  isDirty: boolean;
  isValid: boolean;
  errors: Record<string, any>;
}

export interface FormNavigation {
  canGoNext: boolean;
  canGoPrev: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface FormActions {
  nextStep: () => Promise<void>;
  prevStep: () => void;
  setStep: (step: number) => void;
  resetForm: () => void;
  saveProgress: () => void;
}

export interface FormContextType {
  form: UseFormReturn<SponsorFormData>;
  currentStep: number;
  isSubmitting: boolean;
  progress: number;
  steps: FormStep[];
  formState: FormState;
  actions: FormActions;
  navigation: FormNavigation;
}