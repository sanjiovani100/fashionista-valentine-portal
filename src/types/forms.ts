import type { Database } from './database.types';

export type FormRole = 'model' | 'designer' | 'sponsor';

// Database types
type Tables = Database['public']['Tables'];
type ApplicationRow = Tables['applications']['Row'];
type ModelApplicationRow = Tables['model_applications']['Row'];
type DesignerApplicationRow = Tables['designer_applications']['Row'];
type SponsorApplicationRow = Tables['sponsor_applications']['Row'];

// Common fields for all forms
export interface CommonFormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  references?: string | null;
}

// Model-specific fields
export interface ModelFormFields extends CommonFormFields {
  height: string; // Stored as number in DB, converted during submission
  bust: string; // Stored as number in DB, converted during submission
  waist: string; // Stored as number in DB, converted during submission
  portfolioLink?: string | null;
  instagramHandle?: string | null;
  portfolioFiles: string[];
}

// Designer-specific fields
export interface DesignerFormFields extends CommonFormFields {
  brandName: string;
  website?: string | null;
  collectionDescription: string;
  numberOfPieces: number;
  spaceRequirements: string;
  collectionFiles: string[];
}

// Sponsor-specific fields
export interface SponsorFormFields extends CommonFormFields {
  companyName: string;
  industry: string;
  companyDescription: string;
  marketingGoals: string;
  partnershipPreferences: string;
}

// Union type for all possible form data
export type FormData = ModelFormFields | DesignerFormFields | SponsorFormFields;

// Form state management
export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

// Validation types
export interface FormValidation {
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

export type ValidationMessage = (params?: Record<string, unknown>) => string;

// Type guards for form data
export const isModelForm = (data: FormData): data is ModelFormFields => {
  return 'height' in data && 'bust' in data && 'waist' in data;
};

export const isDesignerForm = (data: FormData): data is DesignerFormFields => {
  return 'brandName' in data && 'collectionDescription' in data;
};

export const isSponsorForm = (data: FormData): data is SponsorFormFields => {
  return 'companyName' in data && 'industry' in data;
};

// Form submission response types
export interface FormSubmissionResponse {
  success: boolean;
  data?: {
    applicationId: string;
    role: FormRole;
  };
  error?: {
    message: string;
    code?: string;
  };
}

// Form validation error types
export interface FormValidationError {
  field: string;
  message: string;
  type: keyof FormValidation;
  params?: Record<string, unknown>;
}

export type FormErrors = Record<string, FormValidationError[]>; 


