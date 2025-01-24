import { LucideIcon } from "lucide-react";

export interface EventFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface EventDetails {
  title: string;
  date: string;
  description: string;
  features: EventFeature[];
}