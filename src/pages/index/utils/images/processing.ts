import { cloudinaryConfig } from '@/components/cloudinary/config';
import type { FashionImage } from '@/types/event.types';
import type { ProcessedImage } from './types';

export const constructImageUrl = (imageData: FashionImage | null): ProcessedImage => {
  console.group('[URL Construction]');
  
  if (!imageData) {
    console.log('No image data, using default placeholder');
    console.groupEnd();
    return {
      url: cloudinaryConfig.defaults.placeholders.highlight,
      alt: 'Default event image'
    };
  }

  try {
    // Use the URL directly since it's already a full Cloudinary URL
    console.log('Using direct URL:', imageData.url);
    
    return {
      url: imageData.url,
      alt: imageData.alt_text || 'Event image'
    };
  } catch (error) {
    console.error('[URL Construction] Error:', error);
    return {
      url: cloudinaryConfig.defaults.placeholders.highlight,
      alt: 'Default event image'
    };
  } finally {
    console.groupEnd();
  }
};