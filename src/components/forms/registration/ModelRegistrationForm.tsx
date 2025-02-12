import React from 'react';
import { useFormSubmission } from '@/hooks/forms/useFormSubmission';
import { modelMeasurementsSchema } from '@/lib/validation/schemas';
import { BaseForm, FormField } from '@/components/common/FormComponents/BaseForm';
import { LoadingButton } from '@/components/common/LoadingStates/LoadingSpinner';
import type { z } from 'zod';
import type { ApiResponse } from '@/types/api/responses';

type ModelFormData = z.infer<typeof modelMeasurementsSchema>;

function transformFormData(data: Record<string, FormDataEntryValue>): ModelFormData {
  return {
    height: Number(data.height),
    bust: Number(data.bust),
    waist: Number(data.waist),
    hips: Number(data.hips),
    shoeSize: Number(data.shoeSize),
  };
}

async function submitModelRegistration(data: ModelFormData): Promise<ApiResponse<ModelFormData>> {
  const response = await fetch('/api/models/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to register model');
  }

  const result = await response.json();
  return {
    data: result,
    error: null,
    status: 'success',
    metadata: {
      requestId: crypto.randomUUID(),
    },
    timestamp: new Date().toISOString(),
  };
}

export function ModelRegistrationForm() {
  const { handleSubmit, isSubmitting } = useFormSubmission(
    modelMeasurementsSchema,
    submitModelRegistration,
    {
      successMessage: 'Model registration successful!',
      resetOnSuccess: true,
      onSuccess: (data) => {
        // Additional success handling if needed
        console.log('Registration successful:', data);
      },
      onError: (error) => {
        // Additional error handling if needed
        console.error('Registration failed:', error);
      },
    }
  );

  return (
    <BaseForm<ModelFormData>
      onSubmit={handleSubmit}
      transform={transformFormData}
      className="space-y-6"
    >
      {({ errors, getFieldError }) => (
        <>
          <FormField
            name="height"
            label="Height (cm)"
            error={getFieldError('height')}
            required
          >
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter height in centimeters"
              min="0"
              max="300"
              step="0.1"
            />
          </FormField>

          <FormField
            name="bust"
            label="Bust (cm)"
            error={getFieldError('bust')}
            required
          >
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter bust measurement"
              min="0"
              max="300"
              step="0.1"
            />
          </FormField>

          <FormField
            name="waist"
            label="Waist (cm)"
            error={getFieldError('waist')}
            required
          >
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter waist measurement"
              min="0"
              max="300"
              step="0.1"
            />
          </FormField>

          <FormField
            name="hips"
            label="Hips (cm)"
            error={getFieldError('hips')}
            required
          >
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter hips measurement"
              min="0"
              max="300"
              step="0.1"
            />
          </FormField>

          <FormField
            name="shoeSize"
            label="Shoe Size (EU)"
            error={getFieldError('shoeSize')}
            required
          >
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter shoe size"
              min="4"
              max="15"
              step="0.5"
            />
          </FormField>

          <LoadingButton
            type="submit"
            isLoading={isSubmitting}
            loadingText="Registering..."
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register as Model
          </LoadingButton>
        </>
      )}
    </BaseForm>
  );
} 


