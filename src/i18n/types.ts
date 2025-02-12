// Sponsors Translation Types
export type SponsorshipLevel = 'gold' | 'silver' | 'bronze';

export interface SponsorsTranslations {
  hero: {
    title: string;
    subtitle: string;
  };
  feature: {
    badge: string;
    title: string;
    description: string;
    benefits: {
      visibility: {
        title: string;
        description: string;
      };
      networking: {
        title: string;
        description: string;
      };
      placement: {
        title: string;
        description: string;
      };
    };
  };
  benefits: {
    visibility: {
      title: string;
      description: string;
    };
    marketing: {
      title: string;
      description: string;
    };
    network: {
      title: string;
      description: string;
    };
  };
  sponsorshipLevels: {
    title: string;
    subtitle: string;
    levels: {
      [K in SponsorshipLevel]: {
        title: string;
        description: string;
      };
    };
    cta: string;
  };
  cta: {
    primary: string;
    secondary: string;
  };
  imageAlt: string;
}

// Common Translation Types
export interface CommonTranslations {
  navigation: {
    home: string;
    models: string;
    sponsors: string;
    getTickets: string;
    changeLanguage: string;
  };
  buttons: {
    explore: string;
    learnMore: string;
    apply: string;
    submit: string;
    register: string;
  };
  footer: {
    contact: string;
    privacy: string;
    terms: string;
    followUs: string;
  };
  accessibility: {
    skipToContent: string;
    menuToggle: string;
    closeMenu: string;
  };
  errors: {
    required: string;
    invalidEmail: string;
    generalError: string;
    networkError: string;
  };
  forms: {
    name: string;
    email: string;
    message: string;
    phone: string;
    submit: string;
  };
}

// Form Translation Types
export interface FormValidation {
  required: string;
  email: string;
  phone: string;
  minLength: string;
  maxLength: string;
  pattern: string;
  match: string;
}

export interface SponsorFormFields {
  companyName: string;
  industry: string;
  companyDescription: string;
  marketingGoals: string;
  partnershipPreferences: string;
  website: string;
  budget: string;
}

export interface CommonFormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface FormTranslations {
  registration: {
    sponsor: {
      title: string;
      subtitle: string;
      fields: SponsorFormFields & CommonFormFields;
      validation: FormValidation;
      submit: string;
      success: string;
      error: string;
    };
    model: {
      title: string;
      subtitle: string;
      fields: {
        experience: string;
        portfolio: string;
        height: string;
        measurements: string;
      } & CommonFormFields;
      validation: FormValidation;
      submit: string;
      success: string;
      error: string;
    };
  };
  common: {
    validation: FormValidation;
    buttons: {
      submit: string;
      cancel: string;
      back: string;
      next: string;
    };
    placeholders: {
      email: string;
      phone: string;
      name: string;
    };
  };
}

// Define namespace interface
export interface Translations {
  sponsors: SponsorsTranslations;
  common: CommonTranslations;
  forms: FormTranslations;
}

// Type-safe translation function
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: Translations;
  }
} 


