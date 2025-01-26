import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { CompanyInformation } from './steps/CompanyInformation';
import { SponsorshipDetails } from './steps/SponsorshipDetails';
import { AdditionalRequirements } from './steps/AdditionalRequirements';
import { FormProgress } from './components/FormProgress';
import { FormNavigation } from './components/FormNavigation';
import { sponsorFormSchema } from './schemas/sponsorFormSchema';
import { useFormSubmission } from './hooks/useFormSubmission';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { title: 'Company Information', component: CompanyInformation },
  { title: 'Sponsorship Details', component: SponsorshipDetails },
  { title: 'Additional Requirements', component: AdditionalRequirements },
];

export const SponsorRegistrationForm = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(sponsorFormSchema),
    mode: 'onChange',
  });

  const { submitForm, isSubmitting } = useFormSubmission();
  const { currentStep, next, back, isFirstStep, isLastStep } = useMultiStepForm(steps.length);
  const CurrentStepComponent = steps[currentStep].component;

  const onSubmit = async (data: any) => {
    if (!isLastStep) {
      next();
      return;
    }
    
    try {
      await submitForm(data);
      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your application and get back to you soon.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Submitting Application",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <FormProgress steps={steps} currentStep={currentStep} />
      
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent />
          </motion.div>

          <FormNavigation
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            onBack={back}
            isSubmitting={isSubmitting}
          />
        </form>
      </FormProvider>
    </div>
  );
};