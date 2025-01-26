import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SponsorFormData } from '../types';

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const submitForm = async (data: SponsorFormData) => {
    setIsSubmitting(true);
    try {
      const applicationData = {
        first_name: data.contactName.split(' ')[0],
        last_name: data.contactName.split(' ').slice(1).join(' '),
        email: data.contactEmail,
        phone: data.contactPhone,
        experience: data.previousExperience || '',
        role: 'sponsor',
        status: 'pending'
      };

      const { data: application, error: applicationError } = await supabase
        .from('applications')
        .insert(applicationData)
        .select()
        .single();

      if (applicationError) throw applicationError;

      const sponsorData = {
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
      };

      const { error: sponsorError } = await supabase
        .from('sponsor_applications')
        .insert(sponsorData);

      if (sponsorError) throw sponsorError;

      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your application and get back to you soon.",
      });

      navigate(`/confirmation?role=sponsor&id=${application.id}`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Submitting Application",
        description: error.message || "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting };
};