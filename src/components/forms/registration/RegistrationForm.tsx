import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSearchParams } from 'react-router-dom';
import { ModelForm } from './ModelForm';
import { DesignerForm } from './DesignerForm';
import { SponsorForm } from './SponsorForm';
import { RoleSelector } from './RoleSelector';

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
    console.log('Form submitted:', { ...data, role: selectedRole });
    // TODO: Implement form submission logic
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
          >
            Submit Application
          </Button>
        </form>
      </Form>
    </div>
  );
};