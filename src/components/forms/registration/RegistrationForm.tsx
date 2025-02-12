import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import { ModelForm } from './ModelForm';
import { DesignerForm } from './DesignerForm';
import { SponsorForm } from './SponsorForm';
import { RoleSelector } from './RoleSelector';
import { Loader2 } from 'lucide-react';
import { CommonFields } from './components/CommonFields';
import { useFormSubmission } from './hooks/useFormSubmission';
import createValidationSchema, { type FormSchema, type FormSchemas } from './schemas/formSchemas';
import type { FormRole } from '@/types/forms';

export const RegistrationForm = () => {
  const [searchParams] = useSearchParams();
  const [selectedRole, setSelectedRole] = React.useState(searchParams.get('role') || 'model');
  const { submitForm, isSubmitting } = useFormSubmission();

  const getSchemaForRole = () => {
    switch (selectedRole) {
      case 'model':
        return commonSchema.merge(modelSchema);
      case 'designer':
        return commonSchema.merge(designerSchema);
      case 'sponsor':
        return commonSchema.merge(sponsorSchema);
      default:
        return commonSchema;
    }
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(getSchemaForRole()),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      experience: '',
      references: ''
    }
  });

  const onSubmit = async (data: FormSchema) => {
    await submitForm(data, selectedRole);
  };

  return (
    <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-md p-8 rounded-xl border border-fashion-pink/20">
      <RoleSelector selectedRole={selectedRole} onRoleSelect={setSelectedRole} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
          <CommonFields form={form} />

          {selectedRole === 'model' && <ModelForm />}
          {selectedRole === 'designer' && <DesignerForm />}
          {selectedRole === 'sponsor' && <SponsorForm />}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-fashion-pink to-deep-purple hover:opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};


