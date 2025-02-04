import React from 'react';
import { useFormError } from '@/hooks/forms/useFormError';
import { ValidationError } from '@/lib/utils/error-handler';

interface BaseFormProps<T = any> {
  onSubmit: (data: T) => Promise<any>;
  children: React.ReactNode | ((props: BaseFormChildrenProps) => React.ReactNode);
  className?: string;
  resetOnSuccess?: boolean;
  transform?: (data: Record<string, FormDataEntryValue>) => T;
}

interface BaseFormChildrenProps {
  isSubmitting: boolean;
  errors: { field?: string; message: string }[];
  getFieldError: (field: string) => string | undefined;
  clearErrors: () => void;
}

export function BaseForm<T>({
  onSubmit,
  children,
  className,
  resetOnSuccess = true,
  transform = (data) => data as unknown as T,
}: BaseFormProps<T>) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { errors, setFormError, getFieldError, clearErrors } = useFormError();
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const rawData = Object.fromEntries(formData.entries());
      const data = transform(rawData);
      const result = await onSubmit(data);

      if (resetOnSuccess) {
        formRef.current?.reset();
      }

      return result;
    } catch (error) {
      if (error instanceof ValidationError) {
        setFormError(error);
      } else {
        setFormError(new Error('An unexpected error occurred. Please try again.'));
      }
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const childrenProps: BaseFormChildrenProps = {
    isSubmitting,
    errors,
    getFieldError,
    clearErrors,
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={className}
      noValidate
    >
      {typeof children === 'function' ? children(childrenProps) : children}
    </form>
  );
}

// Form field components
interface FormFieldProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  name,
  label,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  const id = React.useId();

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {React.cloneElement(children as React.ReactElement, {
        id,
        name,
        'aria-describedby': error ? `${id}-error` : undefined,
        'aria-invalid': error ? 'true' : undefined,
      })}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// Form submit button
interface FormSubmitProps {
  isSubmitting?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormSubmit({
  isSubmitting,
  children,
  className,
}: FormSubmitProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`relative ${className}`}
    >
      {isSubmitting && (
        <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </span>
      )}
      {children}
    </button>
  );
} 