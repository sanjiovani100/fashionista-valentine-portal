import type { Json } from "../common.types";

export interface DesignerProfileRow {
  achievements: string[] | null;
  bio: string;
  brand_name: string;
  contact_email: string;
  contact_phone: string | null;
  created_at: string | null;
  designer_name: string;
  id: string;
  social_media: Json | null;
  updated_at: string | null;
  website: string | null;
}

export interface SponsorProfileRow {
  company_name: string;
  contact_email: string;
  contact_phone: string | null;
  created_at: string | null;
  description: string;
  id: string;
  logo_url: string | null;
  marketing_materials: Json | null;
  sponsorship_level: string;
  updated_at: string | null;
  website: string | null;
}