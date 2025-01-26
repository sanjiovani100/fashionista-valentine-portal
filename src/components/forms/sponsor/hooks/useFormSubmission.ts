import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { SponsorFormSchema } from '../schemas/sponsorFormSchema';

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (data: SponsorFormSchema) => {
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
            paymentMethod: data.paymentMethod,
            logoUrl: data.logoUrl,
            brandGuidelinesUrl: data.brandGuidelinesUrl
          })
        });

      if (sponsorError) throw sponsorError;

      navigate(`/confirmation?role=sponsor&id=${application.id}`);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting };
};