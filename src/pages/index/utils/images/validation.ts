export interface ImageValidationResult {
  isValid: boolean;
  message: string;
}

export const validateImageMetadata = (metadata: unknown): ImageValidationResult => {
  if (!metadata || typeof metadata !== 'object') {
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


