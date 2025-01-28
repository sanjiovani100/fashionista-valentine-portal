import type { Json } from "../common.types";

export interface ApplicationRow {
  created_at: string | null;
  email: string;
  experience: string;
  first_name: string;
  id: string;
  last_name: string;
  phone: string;
  reference_info: string | null;
  role: string;
  status: string | null;
  updated_at: string | null;
}

export interface DesignerApplicationRow {
  application_id: string;
  brand_name: string;
  collection_description: string;
  collection_files: Json | null;
  id: string;
  max_collection_files: number | null;
  max_file_size_mb: number | null;
  number_of_pieces: number;
  space_requirements: string;
  website: string | null;
}

export interface ModelApplicationRow {
  application_id: string;
  bust: number;
  height: number;
  id: string;
  instagram_handle: string | null;
  max_file_size_mb: number | null;
  max_portfolio_files: number | null;
  portfolio_files: Json | null;
  portfolio_link: string | null;
  waist: number;
}

export interface SponsorApplicationRow {
  application_id: string;
  company_description: string;
  company_files: Json | null;
  company_name: string;
  id: string;
  industry: string;
  marketing_goals: string;
  max_company_files: number | null;
  max_file_size_mb: number | null;
  partnership_preferences: string;
}