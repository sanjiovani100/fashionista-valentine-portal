import type { FashionImage } from '@/types/event.types';
import type { ProcessedImage } from '../types/image.types';
import { cloudinaryConfig } from '@/components/cloudinary/config';

export const constructImageUrl = (imageData: FashionImage | null): ProcessedImage => {
  console.log('[URL Construction] Processing image:', imageData);
  
  if (!imageData) {
    console.log('[URL Construction] No image data, using default placeholder');
    return {
      url: cloudinaryConfig.defaults.placeholders.highlight,
      alt: 'Default event image'
    };
  }

  // Use the URL directly since it's already a full Cloudinary URL
  console.log('[URL Construction] Using direct URL:', imageData.url);
  
  return {
    url: imageData.url,
    alt: imageData.alt_text || 'Event image'
  };
};

export const validateImageData = (imageData: FashionImage | null): boolean => {
  if (!imageData) {
    console.warn('[Image Validation] No image data provided');
    return false;
  }

  if (!imageData.url) {
    console.warn('[Image Validation] Missing URL in image data');
    return false;
  }

  if (!imageData.alt_text) {
    console.warn('[Image Validation] Missing alt text in image data');
    return false;
  }

  console.log('[Image Validation] Image data valid:', {
    url: imageData.url,
    alt: imageData.alt_text
  });

  return true;
};