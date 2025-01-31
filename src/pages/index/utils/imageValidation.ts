import type { ImageMetadata } from './imageTypes';

export const validateImageMetadata = (metadata: unknown): { isValid: boolean; message: string } => {
  console.group('[Image Validation]');
  
  if (!metadata || typeof metadata !== 'object') {
    console.warn('Invalid metadata structure:', metadata);
    console.groupEnd();
    return {
      isValid: false, 
      message: 'Invalid metadata structure'
    };
  }

  const meta = metadata as Record<string, unknown>;
  console.log('Metadata validation passed:', meta);
  console.groupEnd();
  
  return {
    isValid: true,
    message: 'Valid metadata'
  };
};