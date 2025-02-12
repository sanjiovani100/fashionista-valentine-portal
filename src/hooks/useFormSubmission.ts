import { useState } from 'react';
import { z } from 'zod';
import { useFormValidation } from './useFormValidation';
import { useFormError } from './useFormError';
import { ValidationError, handleApiError, createValidationError } from '@/lib/utils/error-handler';
import type { ApiResponse, ApiError } from '@/types/api/responses';

export interface FormSubmissionOptions<TData, TResponse> {
  onSuccess?: (data: TResponse) => void;
  onError?: (error: ApiError) => void;
  transform?: (data: Record<string, FormDataEntryValue>) => TData;
  validate?: (data: TData) => void | Promise<void>;
}

export function useFormSubmission<
  TSchema extends z.ZodObject<any, any>,
  TData = z.infer<TSchema>,
  TResponse = TData
>(
  schema: TSchema,
  submitFn: (data: TData) => Promise<ApiResponse<TResponse>>,
  options: FormSubmissionOptions<TData, TResponse> = {}
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { validateForm } = useFormValidation(schema);
  const { setFormError } = useFormError();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const rawData = Object.fromEntries(formData.entries());

      // Validate form data against schema
      const validationResult = await validateForm(rawData);
      if (!validationResult.success) {
        throw createValidationError(
          validationResult.errors.map(err => err.message),
          'Form validation failed'
        );
      }

      // Transform data if needed
      const transformedData = options.transform
        ? options.transform(rawData)
        : (rawData as unknown as TData);

      // Additional validation if provided
      if (options.validate) {
        await options.validate(transformedData);
      }

      // Submit the form
      const response = await submitFn(transformedData);

      if (response.error) {
        throw response.error;
      }

      if (response.data && options.onSuccess) {
        options.onSuccess(response.data);
      }

      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      setFormError(apiError.message);
      
      if (options.onError) {
        options.onError(apiError);
      }
      
      throw apiError;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
  };
} 


