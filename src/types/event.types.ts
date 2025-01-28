import { LucideIcon } from "lucide-react";

export interface EventFeature {
  icon: LucideIcon;
  title: string;
  content: string;
}

export interface EventDetails {
  title: string;
  date: string;
  description: string;
  features: EventFeature[];
}

export interface EventContent {
  id: string;
  event_id: string;
  content_type: string;
  title: string;
  content: string;
  media_urls?: string[] | null;
  publish_date?: string | null;
  engagement_metrics?: any;
  created_at: string;
  updated_at: string;
}