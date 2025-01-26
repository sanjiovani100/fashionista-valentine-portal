import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

interface FormFieldWrapperProps {
  name: string;
  label: string;
  control: any;
  className?: string;
  children: React.ReactNode;
}

export const FormFieldWrapper = ({
  name,
  label,
  control,
  className,
  children
}: FormFieldWrapperProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {React.cloneElement(children as React.ReactElement, { ...field })}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};