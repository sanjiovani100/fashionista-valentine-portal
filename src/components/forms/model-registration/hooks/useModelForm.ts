import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelFormSchema } from '../validation/modelForm.schema';
import type { ModelFormData } from '../types/model.types';
import { useState } from 'react';

export const useModelForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7; // Total number of form sections

  const form = useForm<ModelFormData>({
    resolver: zodResolver(modelFormSchema),
    mode: 'onChange',
    defaultValues: {
      socialMediaLinks: {},
      physicalDetails: {
        height: undefined,
        weight: undefined,
        bustChest: undefined,
        waist: undefined,
        hips: undefined,
        shoeSize: '',
        hairColor: '',
        eyeColor: '',
      },
      portfolio: {
        images: [],
        previousEvents: '',
      },
      availability: {
        dates: [],
        timePreference: 'Morning',
        willTravel: false,
      },
      preferences: {
        role: 'Both',
        designerPreferences: '',
      },
      termsAccepted: false,
    },
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const onSubmit = async (data: ModelFormData) => {
    try {
      // TODO: Implement API call to submit form data
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return {
    form,
    currentStep,
    totalSteps,
    nextStep,
    previousStep,
    goToStep,
    onSubmit: form.handleSubmit(onSubmit),
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
    progress: (currentStep / totalSteps) * 100,
  };
}; 


