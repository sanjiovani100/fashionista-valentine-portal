import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface UseFormErrorReturn {
  formError: string | null;
  setFormError: (error: string | null) => void;
  clearFormError: () => void;
  showFormError: (error: string) => void;
}

export function useFormError(): UseFormErrorReturn {
  const [formError, setFormError] = useState<string | null>(null);

  const clearFormError = useCallback(() => {
    setFormError(null);
  }, []);

  const showFormError = useCallback((error: string) => {
    setFormError(error);
    toast.error(error);
  }, []);

  return {
    formError,
    setFormError,
    clearFormError,
    showFormError,
  };
} 


