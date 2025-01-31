import type { ImageValidationResult } from './types';

export const validateImageMetadata = (metadata: unknown): ImageValidationResult => {
  console.log('[Image Validation] Checking metadata:', metadata);
  
  if (!metadata || typeof metadata !== 'object') {
    console.warn('[Image Validation] Invalid metadata structure:', metadata);
    return {
      isValid: false,
      message: 'Invalid metadata structure'
    };
  }

  return {
    isValid: true,
    message: 'Valid metadata'
  };
};