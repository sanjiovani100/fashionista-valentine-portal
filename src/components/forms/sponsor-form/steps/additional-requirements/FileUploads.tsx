import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormFieldWrapper } from '../../components/FormFieldWrapper';

export const FileUploads = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <FormFieldWrapper
        name="logoUrl"
        label="Company Logo"
        control={control}
      >
        <Input type="file" accept="image/*" />
      </FormFieldWrapper>

      <FormFieldWrapper
        name="brandGuidelinesUrl"
        label="Brand Guidelines"
        control={control}
      >
        <Input type="file" accept=".pdf" />
      </FormFieldWrapper>
    </div>
  );
};

export default FileUploads;