import { UseFormReturn } from 'react-hook-form';
import { SponsorFormData } from '../types';
import { stepValidationSchemas } from '../schema';

export const useFormValidation = (form: UseFormReturn<SponsorFormData>) => {
  const validateStep = async (step: number) => {
    const currentSchema = stepValidationSchemas[step];
    const currentValues = form.getValues();

    try {
      await currentSchema.parseAsync(currentValues);
      return { isValid: true, errors: null };
    } catch (error: any) {
      const formattedErrors = error.errors?.map((err: any) => ({
        field: err.path[0],
        message: err.message,
      }));

      formattedErrors?.forEach(({ field, message }) => {
        form.setError(field as any, {
          type: 'manual',
          message,
        });
      });

      return { isValid: false, errors: formattedErrors };
    }
  };

  return { validateStep };
};