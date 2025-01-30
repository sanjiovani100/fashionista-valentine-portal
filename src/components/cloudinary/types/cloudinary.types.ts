export type AspectRatio = 'square' | 'video' | 'portrait' | 'landscape' | 'auto';

export interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: AspectRatio;
  priority?: boolean;
  onLoadingComplete?: () => void;
  onError?: () => void;
}

export interface ImageLoadingState {
  isLoading: boolean;
  hasError: boolean;
  imageUrl: string;
}

export interface EventContent {
  id: string;
  event_id: string;
  content_type: string;
  title: string;
  content: string;
  media_urls?: string[] | null;
  publish_date?: string | null;
  engagement_metrics?: Json | null;
  created_at: string;
  updated_at: string;
}

export interface FashionCollection {
  id: string;
  designer_id?: string | null;
  event_id: string;
  collection_name: string;
  description: string;
  piece_count: number;
  technical_requirements?: string | null;
  sustainability_info?: string | null;
  created_at: string;
  updated_at: string;
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];