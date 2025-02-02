import type { Json } from '../base/json.types';

export interface ApplicationRow {
  id: string;
  created_at: string | null;
  updated_at: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  experience: string;
  reference_info?: string | null;
  status?: string | null;
  role: string;
}

export interface ModelApplicationRow {
  id: string;
  application_id: string;
  height: number;
  bust: number;
  waist: number;
  portfolio_link?: string | null;
  instagram_handle?: string | null;
  portfolio_files?: Json | null;
  max_portfolio_files?: number | null;
  max_file_size_mb?: number | null;
}

export interface DesignerApplicationRow {
  id: string;
  application_id: string;
  brand_name: string;
  website?: string | null;
  collection_description: string;
  number_of_pieces: number;
  space_requirements: string;
  collection_files?: Json | null;
  max_collection_files?: number | null;
  max_file_size_mb?: number | null;
}

export interface SponsorApplicationRow {
  id: string;
  application_id: string;
  company_name: string;
  industry: string;
  company_description: string;
  marketing_goals: string;
  partnership_preferences: string;
  company_files?: Json | null;
  max_company_files?: number | null;
  max_file_size_mb?: number | null;
}