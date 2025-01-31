import { cloudinaryConfig } from '@/components/cloudinary/config';
import type { FashionImage } from '@/types/event.types';

export interface ProcessedImage {
  url: string;
  alt: string;
}

export const constructImageUrl = (imageData: FashionImage | null): ProcessedImage => {
  if (!imageData) {
    return {
      url: cloudinaryConfig.defaults.placeholders.highlight,
      alt: 'Default event image'
    };
  }

  return {
    url: imageData.url,
    alt: imageData.alt_text || 'Event image'
  };
};