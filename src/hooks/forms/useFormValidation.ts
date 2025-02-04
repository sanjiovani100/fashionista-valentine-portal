import { useCallback } from 'react';
import { z } from 'zod';
import { ValidationError } from '@/lib/utils/error-handler';

interface ValidationOptions {
  abortEarly?: boolean;
}

export function useFormValidation<T extends z.ZodObject<any>>(schema: T) {
  const validateForm = useCallback(
    async (data: unknown, options: ValidationOptions = {}) => {
      try {
        const validatedData = await schema.parseAsync(data, {
          errorMap: (error) => ({
            message: error.message || 'Invalid value',
          }),
        });
        return validatedData;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors = error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          }));

          if (options.abortEarly) {
            throw new ValidationError(errors[0].message, {
              [errors[0].path]: errors[0].message,
            });
          }

          const errorDetails = errors.reduce(
            (acc, { path, message }) => ({
              ...acc,
              [path]: message,
            }),
            {}
          );

          throw new ValidationError(
            'Form validation failed',
            errorDetails
          );
        }
        throw error;
      }
    },
    [schema]
  );

  const validateField = useCallback(
    async (field: keyof z.infer<T>, value: unknown) => {
      try {
        const fieldSchema = schema.shape[field];
        if (!fieldSchema) {
          throw new Error(`No schema found for field: ${String(field)}`);
        }

        await fieldSchema.parseAsync(value);
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new ValidationError(
            error.errors[0].message,
            { [field]: error.errors[0].message }
          );
        }
        throw error;
      }
    },
    [schema]
  );

  return {
    validateForm,
    validateField,
  };
} 