import { useState, useCallback } from 'react';
import { z } from 'zod';
import { useFormValidation } from './useFormValidation';
import { useFormError } from '../useFormError';
import { ValidationError, handleApiError, createValidationError } from '@/lib/utils/error-handler';
import type { ApiResponse, ApiError } from '@/types/api/responses';
import { createSuccessResponse, createErrorResponse } from '@/types/api/responses';
import { toast } from 'sonner';

export interface FormSubmissionOptions<TData, TResponse> {
  onSuccess?: (data: TResponse) => void;
  onError?: (error: ApiError) => void;
  successMessage?: string;
  resetOnSuccess?: boolean;
  transform?: (data: Record<string, FormDataEntryValue>) => TData;
  validate?: (data: TData) => void | Promise<void>;
}

/**
 * Hook for handling form submissions with validation and error handling
 */
export function useFormSubmission<
  TSchema extends z.ZodObject<any, any>,
  TData = z.infer<TSchema>,
  TResponse = TData
>(
  schema: TSchema,
  submitFn: FormSubmitFunction<TData, TResponse>,
  options: FormSubmissionOptions<TData, TResponse> = {}
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { validateForm } = useFormValidation(schema);
  const { setFormError, clearFormError, showFormError } = useFormError();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      clearFormError();

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

        // Handle success
        if (options.successMessage) {
          toast.success(options.successMessage);
        }

        if (response.data && options.onSuccess) {
          options.onSuccess(response.data);
        }

        if (options.resetOnSuccess) {
          event.currentTarget.reset();
        }

        return response.data;
      } catch (error) {
        const apiError = handleApiError(error);
        showFormError(apiError.message);
        
        if (options.onError) {
          options.onError(apiError);
        }
        
        throw apiError;
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      validateForm,
      submitFn,
      options,
      clearFormError,
      showFormError
    ]
  );

  return {
    handleSubmit,
    isSubmitting,
  };
}

// Helper type for form submission functions
export type FormSubmitFunction<TData, TResponse = TData> = (
  data: TData
) => Promise<ApiResponse<TResponse>>;

/**
 * Creates a typed submit function that handles API responses
 */
export function createSubmitFunction<TData, TResponse = TData>(
  fn: (data: TData) => Promise<TResponse>
): FormSubmitFunction<TData, TResponse> {
  return async (data: TData) => {
    try {
      const result = await fn(data);
      return createSuccessResponse(result);
    } catch (error) {
      return createErrorResponse(handleApiError(error));
    }
  };
}

/**
 * Type guard for checking if a value matches the schema type
 */
export function isSchemaType<T extends z.ZodType<any, any>>(
  schema: T,
  value: unknown
): value is z.infer<T> {
  const result = schema.safeParse(value);
  return result.success;
} 