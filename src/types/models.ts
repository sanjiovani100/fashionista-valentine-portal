import type { Json } from './database';
import type { ModelApplicationRow } from './supabase/tables/applications.types';

/**
 * Base interface for model profile data
 * @description Represents the core data structure for a model's profile
 */
export interface BaseModelProfile {
  // Required fields
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  
  // Measurements (in centimeters/EU sizes)
  height: number; // in cm
  bust: number;  // in cm
  waist: number; // in cm
  hips: number;  // in cm
  shoe_size: number; // EU size
  
  // Experience and social
  experience_years: number;
  portfolio_url: string | null;
  instagram_handle: string | null;
  availability: boolean;
  
  // Metadata
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  meta_data: Json | null;
}

/**
 * Extended model profile with application data
 */
export interface ModelProfileWithApplication extends BaseModelProfile {
  application: ModelApplicationRow | null;
}

/**
 * Model measurements subset for form handling
 */
export interface ModelMeasurements {
  height: number;
  bust: number;
  waist: number;
  hips: number;
  shoe_size: number;
}

/**
 * Form data type excluding system-managed fields
 */
export type ModelFormData = Omit<
  BaseModelProfile,
  'id' | 'user_id' | 'created_at' | 'updated_at' | 'meta_data'
>;

/**
 * Type for partial updates to model data
 */
export type ModelUpdateData = Partial<ModelFormData>;

/**
 * Type guard to check if an object is a valid model profile
 */
export function isModelProfile(obj: unknown): obj is BaseModelProfile {
  if (!obj || typeof obj !== 'object') return false;
  
  const requiredFields: Array<keyof BaseModelProfile> = [
    'id',
    'user_id',
    'first_name',
    'last_name',
    'email',
    'phone'
  ];
  
  return requiredFields.every(field => field in obj);
}

/**
 * Type guard for model measurements
 */
export function isModelMeasurements(obj: unknown): obj is ModelMeasurements {
  if (!obj || typeof obj !== 'object') return false;
  
  const measurements: Array<keyof ModelMeasurements> = [
    'height',
    'bust',
    'waist',
    'hips',
    'shoe_size'
  ];
  
  return measurements.every(field => 
    field in obj && 
    typeof (obj as any)[field] === 'number' &&
    (obj as any)[field] > 0
  );
}

/**
 * Constants for measurement validation
 */
export const MODEL_MEASUREMENT_CONSTRAINTS = {
  height: { min: 140, max: 200 }, // cm
  bust: { min: 70, max: 130 },    // cm
  waist: { min: 50, max: 100 },   // cm
  hips: { min: 70, max: 130 },    // cm
  shoe_size: { min: 35, max: 45 } // EU size
} as const; 