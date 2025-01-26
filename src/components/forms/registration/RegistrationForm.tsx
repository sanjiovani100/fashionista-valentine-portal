import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ModelForm } from './ModelForm';
import { DesignerForm } from './DesignerForm';
import { SponsorForm } from './SponsorForm';
import { RoleSelector } from './RoleSelector';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const commonSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  experience: z.string().min(10, 'Please describe your experience'),
  references: z.string().optional()
});

export const RegistrationForm = () => {
  const [searchParams] = useSearchParams();
  const [selectedRole, setSelectedRole] = React.useState(searchParams.get('role') || 'model');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(commonSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      experience: '',
      references: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof commonSchema>) => {
    setIsSubmitting(true);
    try {
      // Insert main application
      const { data: application, error: applicationError } = await supabase
        .from('applications')
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          experience: data.experience,
          reference_info: data.references,
          role: selectedRole,
          status: 'pending'
        })
        .select()
        .single();

      if (applicationError) throw applicationError;

      // Handle role-specific data
      const roleSpecificData = form.getValues();
      let roleTableName = '';
      let roleData = {};

      switch (selectedRole) {
        case 'model':
          roleTableName = 'model_applications';
          roleData = {
            application_id: application.id,
            height: roleSpecificData.height,
            bust: roleSpecificData.bust,
            waist: roleSpecificData.waist,
            portfolio_link: roleSpecificData.portfolioLink,
            instagram_handle: roleSpecificData.instagramHandle
          };
          break;
        case 'designer':
          roleTableName = 'designer_applications';
          roleData = {
            application_id: application.id,
            brand_name: roleSpecificData.brandName,
            website: roleSpecificData.website,
            collection_description: roleSpecificData.collectionDescription,
            number_of_pieces: roleSpecificData.numberOfPieces,
            space_requirements: roleSpecificData.spaceRequirements
          };
          break;
        case 'sponsor':
          roleTableName = 'sponsor_applications';
          roleData = {
            application_id: application.id,
            company_name: roleSpecificData.companyName,
            industry: roleSpecificData.industry,
            company_description: roleSpecificData.companyDescription,
            marketing_goals: roleSpecificData.marketingGoals,
            partnership_preferences: roleSpecificData.partnershipPreferences
          };
          break;
      }

      const { error: roleError } = await supabase
        .from(roleTableName)
        .insert(roleData);

      if (roleError) throw roleError;

      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your application and get back to you soon.",
      });

      // Navigate to confirmation page
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

  return (
    <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-md p-8 rounded-xl border border-fashion-pink/20">
      <RoleSelector selectedRole={selectedRole} onRoleSelect={setSelectedRole} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your relevant experience"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="references"
            render={({ field }) => (
              <FormItem>
                <FormLabel>References (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List any professional references"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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