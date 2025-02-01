import { useTranslation } from 'react-i18next';
import type { FormValidation } from '../types';

export type FormType = 'sponsor' | 'model';

export interface FormValidation {
  required: string;
  email: string;
  phone: string;
  url: string;
  minLength: string;
}

export interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  companyDescription: string;
  marketingGoals: string;
  partnershipPreferences: string;
  website: string;
  budget: string;
  experience: string;
  portfolio: string;
  height: string;
  measurements: string;
}

export interface FormTranslations {
  title: string;
  subtitle: string;
  submitButton: string;
  submittingButton: string;
  successMessage: string;
  errorMessage: string;
  fields: FormFields;
  validation: FormValidation;
  placeholders: FormFields;
}

export function useFormTranslation(formType: FormType) {
  const { t } = useTranslation();
  const formNamespace = `forms.${formType}`;

  return {
    getFieldLabel: (field: keyof FormFields) => t(`${formNamespace}.fields.${field}`),
    getPlaceholder: (field: keyof FormFields) => t(`${formNamespace}.placeholders.${field}`),
    getValidationMessage: (type: keyof FormValidation, count?: number) => 
      t(`${formNamespace}.validation.${type}`, { count }),
    getFormTitle: () => t(`${formNamespace}.title`),
    getFormSubtitle: () => t(`${formNamespace}.subtitle`),
    getButtonText: (isSubmitting: boolean) => 
      isSubmitting ? t(`${formNamespace}.submittingButton`) : t(`${formNamespace}.submitButton`),
    getSuccessMessage: () => t(`${formNamespace}.successMessage`),
    getErrorMessage: () => t(`${formNamespace}.errorMessage`),
  };
}

// Validation message helper
export const getValidationSchema = (formType: FormType) => {
  const { getValidationMessage } = useFormTranslation(formType);
  
  return {
    required: () => getValidationMessage('required'),
    email: () => getValidationMessage('email'),
    phone: () => getValidationMessage('phone'),
    minLength: (count: number) => getValidationMessage('minLength', count),
    maxLength: (count: number) => getValidationMessage('maxLength', count),
    pattern: () => getValidationMessage('pattern'),
    match: () => getValidationMessage('match')
  };
}; 