import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useFormTranslation } from '@/i18n/utils/form';
import { createValidationSchema, sponsorSchema } from './registration/schemas/formSchemas';
import type { FormSchema } from './registration/schemas/formSchemas';

export function SponsorForm() {
  const { getFieldLabel, getPlaceholder, getButtonText, getFormTitle, getFormSubtitle, getSuccessMessage, getErrorMessage } = useFormTranslation('sponsor');
  
  const form = useForm<FormSchema>({
    resolver: zodResolver(createValidationSchema('sponsor')),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      industry: '',
      companyDescription: '',
      marketingGoals: '',
      partnershipPreferences: '',
      website: '',
      budget: ''
    }
  });

  const { isSubmitting, isSubmitSuccessful } = form.formState;

  const onSubmit = async (data: FormSchema) => {
    try {
      // TODO: Implement form submission logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{getFormTitle()}</h2>
        <p className="text-gray-600">{getFormSubtitle()}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{getFieldLabel('firstName')}</FormLabel>
                  <FormControl>
                    <Input placeholder={getPlaceholder('firstName')} {...field} />
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
                  <FormLabel>{getFieldLabel('lastName')}</FormLabel>
                  <FormControl>
                    <Input placeholder={getPlaceholder('lastName')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{getFieldLabel('email')}</FormLabel>
                <FormControl>
                  <Input placeholder={getPlaceholder('email')} type="email" {...field} />
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
                <FormLabel>{getFieldLabel('phone')}</FormLabel>
                <FormControl>
                  <Input placeholder={getPlaceholder('phone')} type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{getFieldLabel('companyName')}</FormLabel>
                <FormControl>
                  <Input placeholder={getPlaceholder('companyName')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{getFieldLabel('industry')}</FormLabel>
                <FormControl>
                  <Input placeholder={getPlaceholder('industry')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{getFieldLabel('companyDescription')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={getPlaceholder('companyDescription')}
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
            name="marketingGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{getFieldLabel('marketingGoals')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={getPlaceholder('marketingGoals')}
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
            name="partnershipPreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{getFieldLabel('partnershipPreferences')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={getPlaceholder('partnershipPreferences')}
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
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{getFieldLabel('website')}</FormLabel>
                <FormControl>
                  <Input placeholder={getPlaceholder('website')} type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{getFieldLabel('budget')}</FormLabel>
                <FormControl>
                  <Input placeholder={getPlaceholder('budget')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isSubmitSuccessful && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                {getSuccessMessage()}
              </AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {getButtonText(isSubmitting)}
          </Button>
        </form>
      </Form>
    </div>
  );
}


