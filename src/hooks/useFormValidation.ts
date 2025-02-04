import { z } from 'zod';

export interface ValidationResult {
  success: boolean;
  errors: Array<{
    path: string[];
    message: string;
  }>;
}

export function useFormValidation<T extends z.ZodObject<any, any>>(schema: T) {
  const validateForm = async (data: unknown): Promise<ValidationResult> => {
    try {
      await schema.parseAsync(data);
      return {
        success: true,
        errors: [],
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          errors: error.errors.map(err => ({
            path: err.path.map(String),
            message: err.message,
          })),
        };
      }
      // If it's not a Zod error, treat it as a general validation error
      return {
        success: false,
        errors: [{
          path: [],
          message: error instanceof Error ? error.message : 'Validation failed',
        }],
      };
    }
  };

  return {
    validateForm,
  };
} 