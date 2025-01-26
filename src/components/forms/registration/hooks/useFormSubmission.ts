import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import type { FormSchema } from '../schemas/formSchemas';

type Tables = Database['public']['Tables'];
type ApplicationInsert = Tables['applications']['Insert'];
type ModelApplicationInsert = Tables['model_applications']['Insert'];
type DesignerApplicationInsert = Tables['designer_applications']['Insert'];
type SponsorApplicationInsert = Tables['sponsor_applications']['Insert'];

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const submitForm = async (data: FormSchema, selectedRole: string) => {
    setIsSubmitting(true);
    try {
      const applicationData: ApplicationInsert = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        experience: data.experience,
        reference_info: data.references,
        role: selectedRole,
        status: 'pending'
      };

      const { data: application, error: applicationError } = await supabase
        .from('applications')
        .insert(applicationData)
        .select()
        .single();

      if (applicationError) throw applicationError;

      switch (selectedRole) {
        case 'model': {
          const modelData: ModelApplicationInsert = {
            application_id: application.id,
            height: data.height!,
            bust: data.bust!,
            waist: data.waist!,
            portfolio_link: data.portfolioLink,
            instagram_handle: data.instagramHandle
          };
          
          const { error: roleError } = await supabase
            .from('model_applications')
            .insert(modelData);
            
          if (roleError) throw roleError;
          break;
        }
        case 'designer': {
          const designerData: DesignerApplicationInsert = {
            application_id: application.id,
            brand_name: data.brandName!,
            website: data.website,
            collection_description: data.collectionDescription!,
            number_of_pieces: data.numberOfPieces!,
            space_requirements: data.spaceRequirements!
          };
          
          const { error: roleError } = await supabase
            .from('designer_applications')
            .insert(designerData);
            
          if (roleError) throw roleError;
          break;
        }
        case 'sponsor': {
          const sponsorData: SponsorApplicationInsert = {
            application_id: application.id,
            company_name: data.companyName!,
            industry: data.industry!,
            company_description: data.companyDescription!,
            marketing_goals: data.marketingGoals!,
            partnership_preferences: data.partnershipPreferences!
          };
          
          const { error: roleError } = await supabase
            .from('sponsor_applications')
            .insert(sponsorData);
            
          if (roleError) throw roleError;
          break;
        }
      }

      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your application and get back to you soon.",
      });

      navigate(`/confirmation?role=${selectedRole}&id=${application.id}`);

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