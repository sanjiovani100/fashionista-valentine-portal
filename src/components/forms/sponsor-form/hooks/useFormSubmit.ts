import { useState } from 'react';
import { SponsorFormData } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const useFormSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (data: SponsorFormData) => {
    setIsSubmitting(true);
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

      return { success: true, applicationId: application.id };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Submitting Application",
        description: error.message || "Please try again later.",
      });
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting };
};