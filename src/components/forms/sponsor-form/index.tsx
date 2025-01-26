import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { FormProgress } from '@/components/ui/form-progress';
import { FormNavigation } from '@/components/ui/form-navigation';
import { FormProvider, useFormContext } from './context';
import { sponsorFormSchema } from './schema';
import type { SponsorFormData } from './types';
import { CompanyInformation, SponsorshipDetails, AdditionalRequirements } from './steps';
import { supabase } from '@/integrations/supabase/client';

const SponsorRegistrationForm = () => {
  const form = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorFormSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: SponsorFormData) => {
    try {
      // Insert main application record
      const { data: application, error: applicationError } = await supabase
        .from('applications')
        .insert({
          first_name: data.contactName.split(' ')[0],
          last_name: data.contactName.split(' ').slice(1).join(' '),
          email: data.contactEmail,
          phone: data.contactPhone,
          experience: data.previousExperience || '',
          role: 'sponsor',
          status: 'pending'
        })
        .select()
        .single();

      if (applicationError) throw applicationError;

      // Insert sponsor-specific details
      const { error: sponsorError } = await supabase
        .from('sponsor_applications')
        .insert({
          application_id: application.id,
          company_name: data.companyName,
          industry: data.industry,
          company_description: `${data.companySize} - ${data.website || 'No website provided'}`,
          marketing_goals: data.marketingGoals,
          partnership_preferences: JSON.stringify({
            sponsorshipLevel: data.sponsorshipLevel,
            targetAudience: data.targetAudience,
            specialRequirements: data.specialRequirements,
            paymentMethod: data.paymentMethod
          })
        });

      if (sponsorError) throw sponsorError;

      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your application and get back to you soon.",
      });

      form.reset();
      localStorage.removeItem('sponsor_form_data');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Submitting Application",
        description: error.message || "Please try again later.",
      });
    }
  };

  return (
    <FormProvider form={form}>
      <FormContent onSubmit={onSubmit} />
    </FormProvider>
  );
};

const FormContent = ({ onSubmit }: { onSubmit: (data: SponsorFormData) => void }) => {
  const { form, currentStep, isSubmitting, progress } = useFormContext();

  return (
    <div className="max-w-2xl mx-auto p-6" id="form-top">
      <FormProgress progress={progress} />

      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {currentStep === 1 && <CompanyInformation />}
              {currentStep === 2 && <SponsorshipDetails />}
              {currentStep === 3 && <AdditionalRequirements />}
            </AnimatePresence>

            <FormNavigation
              isSubmitting={isSubmitting}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SponsorRegistrationForm;