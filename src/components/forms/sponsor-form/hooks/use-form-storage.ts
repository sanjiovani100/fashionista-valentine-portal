import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SponsorFormData } from '../types';

const STORAGE_KEY = 'sponsor_form_data';

export const useFormStorage = (form: UseFormReturn<SponsorFormData>) => {
  // Auto-save form data
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Load saved form data
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, [form]);

  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return { clearStorage };
};