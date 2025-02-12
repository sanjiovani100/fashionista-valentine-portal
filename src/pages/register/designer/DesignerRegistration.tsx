import React from 'react';
import { PageLayout } from "@/components/layout/PageLayout";
import { DesignerForm } from "@/components/forms/registration/DesignerForm";
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import createValidationSchema, { type FormSchema } from '@/components/forms/registration/schemas/formSchemas';
import type { FormRole } from '@/types/forms';
import { useFormSubmission } from '@/components/forms/registration/hooks/useFormSubmission';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CommonFields } from '@/components/forms/registration/components/CommonFields';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DesignerRegistration = () => {
  const { submitForm, isSubmitting } = useFormSubmission();
  const validationSchema = createValidationSchema('en').designer;
  const form = useForm<FormSchema<'designer'>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      experience: '',
      brandName: '',
      website: '',
      collectionDescription: '',
      numberOfPieces: 0,
      spaceRequirements: '',
      collectionFiles: []
    }
  });

  const onSubmit = async (data: FormSchema<'designer'>) => {
    await submitForm(data, 'designer');
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-black via-deep-purple to-black py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <Link 
            to="/register" 
            className="inline-flex items-center text-fashion-pink hover:text-fashion-pink/80 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Role Selection
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-playfair mb-4">Designer Application</h1>
            <p className="text-xl text-gray-300 font-montserrat">Showcase your collection</p>
          </div>

          <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-md p-8 rounded-xl border border-fashion-pink/20">
            <FormProvider {...form}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <CommonFields form={form} />
                  <DesignerForm />
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
            </FormProvider>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default DesignerRegistration;


