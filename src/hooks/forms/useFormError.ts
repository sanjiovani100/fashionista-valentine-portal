import { useState, useCallback } from 'react';
import { handleFormError, ValidationError } from '@/lib/utils/error-handler';

interface FormError {
  field?: string;
  message: string;
}

interface UseFormErrorReturn {
  errors: FormError[];
  setFieldError: (field: string, message: string) => void;
  setFormError: (error: unknown) => void;
  clearErrors: () => void;
  hasErrors: boolean;
  getFieldError: (field: string) => string | undefined;
}

export function useFormError(): UseFormErrorReturn {
  const [errors, setErrors] = useState<FormError[]>([]);

  const setFieldError = useCallback((field: string, message: string) => {
    setErrors(prev => [...prev, { field, message }]);
  }, []);

  const setFormError = useCallback((error: unknown) => {
    const errorMessages = handleFormError(error);
    
    if (error instanceof ValidationError && typeof error.details === 'object') {
      // Handle structured validation errors
      const details = error.details as Record<string, string>;
      setErrors(
        Object.entries(details).map(([field, message]) => ({
          field,
          message,
        }))
      );
    } else {
      // Handle general errors
      setErrors(
        errorMessages.map(message => ({
          message,
        }))
      );
    }
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const getFieldError = useCallback(
    (field: string) => {
      const error = errors.find(e => e.field === field);
      return error?.message;
    },
    [errors]
  );

  return {
    errors,
    setFieldError,
    setFormError,
    clearErrors,
    hasErrors: errors.length > 0,
    getFieldError,
  };
} 


