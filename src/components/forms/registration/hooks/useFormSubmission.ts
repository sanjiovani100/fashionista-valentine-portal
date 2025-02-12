import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import type { FormRole, FormData, ModelFormFields, DesignerFormFields, SponsorFormFields } from '@/types/forms';

type Tables = Database['public']['Tables'];
type ApplicationInsert = Tables['applications']['Insert'];
type ModelApplicationInsert = Tables['model_applications']['Insert'];
type DesignerApplicationInsert = Tables['designer_applications']['Insert'];
type SponsorApplicationInsert = Tables['sponsor_applications']['Insert'];

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const submitForm = async (data: FormData, selectedRole: FormRole) => {
    setIsSubmitting(true);
    try {
      // Common application data
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

      // Role-specific data
      switch (selectedRole) {
        case 'model': {
          const modelData = data as ModelFormFields;
          const roleData: ModelApplicationInsert = {
            application_id: application.id,
            height: parseFloat(modelData.height),
            bust: parseFloat(modelData.bust),
            waist: parseFloat(modelData.waist),
            portfolio_link: modelData.portfolioLink,
            instagram_handle: modelData.instagramHandle,
            portfolio_files: modelData.portfolioFiles
          };
          
          const { error: roleError } = await supabase
            .from('model_applications')
            .insert(roleData);
            
          if (roleError) throw roleError;
          break;
        }
        case 'designer': {
          const designerData = data as DesignerFormFields;
          const roleData: DesignerApplicationInsert = {
            application_id: application.id,
            brand_name: designerData.brandName,
            website: designerData.website,
            collection_description: designerData.collectionDescription,
            number_of_pieces: designerData.numberOfPieces,
            space_requirements: designerData.spaceRequirements,
            collection_files: designerData.collectionFiles
          };
          
          const { error: roleError } = await supabase
            .from('designer_applications')
            .insert(roleData);
            
          if (roleError) throw roleError;
          break;
        }
        case 'sponsor': {
          const sponsorData = data as SponsorFormFields;
          const roleData: SponsorApplicationInsert = {
            application_id: application.id,
            company_name: sponsorData.companyName,
            industry: sponsorData.industry,
            company_description: sponsorData.companyDescription,
            marketing_goals: sponsorData.marketingGoals,
            partnership_preferences: sponsorData.partnershipPreferences
          };
          
          const { error: roleError } = await supabase
            .from('sponsor_applications')
            .insert(roleData);
            
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


