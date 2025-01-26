import React from 'react';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/components/forms/sponsor-form/context';

interface FormNavigationProps {
  isSubmitting: boolean;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({ isSubmitting }) => {
  const { actions, navigation } = useFormContext();

  return (
    <div className="flex justify-between mt-6">
      <Button
        type="button"
        variant="outline"
        onClick={actions.prevStep}
        disabled={!navigation.canGoPrev || isSubmitting}
      >
        Previous
      </Button>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={actions.saveProgress}
          disabled={isSubmitting}
        >
          Save Progress
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {navigation.isLastStep ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
};