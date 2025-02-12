import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export type FormType = 'sponsor' | 'model';

export type ValidationKey = 
  | 'required'
  | 'email'
  | 'phone'
  | 'url'
  | 'minLength'
  | 'maxLength'
  | 'min'
  | 'max'
  | 'pattern'
  | 'custom';

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

export interface FormValidationMessages {
  required: string;
  email: string;
  phone: string;
  url: string;
  minLength: string;
  maxLength: string;
  min: string;
  max: string;
  pattern: string;
  custom: string;
}

export interface FormTranslations {
  title: string;
  subtitle: string;
  submitButton: string;
  submittingButton: string;
  successMessage: string;
  errorMessage: string;
  fields: FormFields;
  validation: FormValidationMessages;
  placeholders: FormFields;
}

type ValidationParams = Record<string, string | number | undefined>;

export const getFormValidationMessage = (
  locale: string,
  key: ValidationKey,
  params: ValidationParams = {}
): string => {
  const t = i18next.getFixedT(locale, 'validation');
  return t(key, params);
};

export function useFormTranslation(formType: FormType) {
  const { t } = useTranslation();
  const formNamespace = `forms.${formType}`;

  const getValidationMessage = (type: keyof FormValidationMessages, params?: ValidationParams) => 
    t(`${formNamespace}.validation.${type}`, params);

  return {
    getFieldLabel: (field: keyof FormFields) => t(`${formNamespace}.fields.${field}`),
    getPlaceholder: (field: keyof FormFields) => t(`${formNamespace}.placeholders.${field}`),
    getValidationMessage,
    getFormTitle: () => t(`${formNamespace}.title`),
    getFormSubtitle: () => t(`${formNamespace}.subtitle`),
    getButtonText: (isSubmitting: boolean) => 
      isSubmitting ? t(`${formNamespace}.submittingButton`) : t(`${formNamespace}.submitButton`),
    getSuccessMessage: () => t(`${formNamespace}.successMessage`),
    getErrorMessage: () => t(`${formNamespace}.errorMessage`),
    getValidationSchema: () => ({
      required: () => getValidationMessage('required'),
      email: () => getValidationMessage('email'),
      phone: () => getValidationMessage('phone'),
      url: () => getValidationMessage('url'),
      minLength: (count: number) => getValidationMessage('minLength', { count }),
      maxLength: (count: number) => getValidationMessage('maxLength', { count }),
      min: (min: number) => getValidationMessage('min', { min }),
      max: (max: number) => getValidationMessage('max', { max }),
      pattern: (pattern: string) => getValidationMessage('pattern', { pattern }),
      custom: (message: string) => getValidationMessage('custom', { message })
    })
  };
} 


