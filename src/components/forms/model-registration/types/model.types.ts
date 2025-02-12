export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Professional';

export type TimePreference = 'Morning' | 'Afternoon' | 'Evening';

export type ModelRole = 'Runway' | 'Photoshoot' | 'Both';

export interface PhysicalDetails {
  height: number;
  weight?: number;
  bustChest?: number;
  waist?: number;
  hips?: number;
  shoeSize: string;
  hairColor: string;
  eyeColor: string;
}

export interface Portfolio {
  images: File[];
  video?: File;
  previousEvents?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface ModelAvailability {
  dates: Date[];
  timePreference: TimePreference;
  willTravel: boolean;
}

export interface ModelPreferences {
  role: ModelRole;
  designerPreferences?: string;
}

export interface ModelFormData {
  // Personal Information
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  socialMediaLinks?: {
    instagram?: string;
    linkedin?: string;
  };
  
  // Physical Details
  physicalDetails: PhysicalDetails;
  
  // Experience and Portfolio
  experienceLevel: ExperienceLevel;
  portfolio: Portfolio;
  
  // Availability and Preferences
  availability: ModelAvailability;
  preferences: ModelPreferences;
  
  // Emergency Contact
  emergencyContact: EmergencyContact;
  
  // Terms
  termsAccepted: boolean;
} 


