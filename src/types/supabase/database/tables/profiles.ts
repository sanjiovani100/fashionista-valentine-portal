import type { Json } from '../common';

export interface DesignerProfileRow {
  id: string;
  brand_name: string;
  designer_name: string;
  bio: string;
  website?: string | null;
  social_media?: Json | null;
  achievements?: string[] | null;
  contact_email: string;
  contact_phone?: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface SponsorProfileRow {
  id: string;
  company_name: string;
  description: string;
  logo_url?: string | null;
  website?: string | null;
  sponsorship_level: string;
  marketing_materials?: Json | null;
  contact_email: string;
  contact_phone?: string | null;
  created_at: string | null;
  updated_at: string | null;
}