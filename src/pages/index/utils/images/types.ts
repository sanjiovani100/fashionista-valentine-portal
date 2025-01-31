import type { FashionImage } from '@/types/event.types';

export interface ProcessedImage {
  url: string;
  alt: string;
}

export interface ImageValidationResult {
  isValid: boolean;
  message: string;
}

export interface ImageSelectionCriteria {
  category?: string;
  contentId?: string;
  metadata?: Record<string, unknown>;
}