import { useFormContext } from 'react-hook-form';
import { type FormSchema } from './schemas/formSchemas';
import { useFormTranslation, type FormFields, type FormValidationMessages } from '@/i18n/utils/form';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const SponsorForm = () => {
  const { control, formState: { isSubmitSuccessful, isSubmitting, isSubmitted } } = useFormContext<FormSchema<'sponsor'>>();
  const { getFieldLabel, getPlaceholder, getValidationMessage, getSuccessMessage, getErrorMessage } = useFormTranslation('sponsor');

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-xl font-playfair mb-4">{getFieldLabel('companyName' as keyof FormFields)}</h3>
        
        <FormField
          control={control}
          name="companyName"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">{getFieldLabel('companyName' as keyof FormFields)}</label>
              <Input
                {...field}
                placeholder={getPlaceholder('companyName' as keyof FormFields)}
                className="bg-black/20 border-white/10 text-white"
              />
            </div>
          )}
        />

        <FormField
          control={control}
          name="industry"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">{getFieldLabel('industry' as keyof FormFields)}</label>
              <Input
                {...field}
                placeholder={getPlaceholder('industry' as keyof FormFields)}
                className="bg-black/20 border-white/10 text-white"
              />
            </div>
          )}
        />

        <FormField
          control={control}
          name="companyDescription"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">{getFieldLabel('companyDescription' as keyof FormFields)}</label>
              <Textarea
                {...field}
                placeholder={getPlaceholder('companyDescription' as keyof FormFields)}
                className="bg-black/20 border-white/10 text-white min-h-[100px]"
              />
            </div>
          )}
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-playfair mb-4">{getFieldLabel('marketingGoals' as keyof FormFields)}</h3>

        <FormField
          control={control}
          name="marketingGoals"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">{getFieldLabel('marketingGoals' as keyof FormFields)}</label>
              <Textarea
                {...field}
                placeholder={getPlaceholder('marketingGoals' as keyof FormFields)}
                className="bg-black/20 border-white/10 text-white min-h-[100px]"
              />
            </div>
          )}
        />

        <FormField
          control={control}
          name="partnershipPreferences"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium">{getFieldLabel('partnershipPreferences' as keyof FormFields)}</label>
              <Textarea
                {...field}
                placeholder={getPlaceholder('partnershipPreferences' as keyof FormFields)}
                className="bg-black/20 border-white/10 text-white min-h-[100px]"
              />
            </div>
          )}
        />
      </div>

      {isSubmitSuccessful && (
        <Alert className="bg-green-500/10 border-green-500/20 text-green-500">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            {getSuccessMessage()}
          </AlertDescription>
        </Alert>
      )}

      {!isSubmitSuccessful && isSubmitted && (
        <Alert className="bg-red-500/10 border-red-500/20 text-red-500">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {getErrorMessage()}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};