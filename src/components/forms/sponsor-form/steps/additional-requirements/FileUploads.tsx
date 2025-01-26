import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormFieldWrapper } from '../../components/FormFieldWrapper';
import { FileUpload } from '@/components/forms/registration/components/FileUpload';

export const FileUploads = () => {
  const { control, setValue } = useFormContext();

  const handleLogoUpload = (urls: string[]) => {
    setValue('logoUrl', urls[0]);
  };

  const handleGuidelinesUpload = (urls: string[]) => {
    setValue('brandGuidelinesUrl', urls[0]);
  };

  return (
    <div className="space-y-6">
      <FormFieldWrapper
        name="logoUrl"
        label="Company Logo"
        control={control}
      >
        <FileUpload
          role="sponsor"
          maxFiles={1}
          maxSizeMB={5}
          onUploadComplete={handleLogoUpload}
          acceptedFileTypes={['image/*']}
        />
      </FormFieldWrapper>

      <FormFieldWrapper
        name="brandGuidelinesUrl"
        label="Brand Guidelines"
        control={control}
      >
        <FileUpload
          role="sponsor"
          maxFiles={1}
          maxSizeMB={10}
          onUploadComplete={handleGuidelinesUpload}
          acceptedFileTypes={['application/pdf']}
        />
      </FormFieldWrapper>
    </div>
  );
};