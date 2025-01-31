import { cloudinaryConfig } from '@/components/cloudinary/config';
import type { FashionImage } from '@/types/event.types';
import type { ProcessedImage } from './types';

export const constructImageUrl = (imageData: FashionImage | null): ProcessedImage => {
  console.log('[URL Construction] Processing image:', imageData);

  if (!imageData) {
    console.log('[URL Construction] No image data, using default placeholder');
    return {
      url: cloudinaryConfig.defaults.placeholders.highlight,
      alt: 'Default event image'
    };
  }

  const url = `https://res.cloudinary.com/${cloudinaryConfig.cloud.cloudName}/image/upload/${imageData.url}`;
  console.log('[URL Construction] Generated URL:', url);

  return {
    url,
    alt: imageData.alt_text || 'Event image'
  };
};