import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface FormNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  isSubmitting: boolean;
}

export const FormNavigation = ({
  isFirstStep,
  isLastStep,
  onBack,
  isSubmitting
}: FormNavigationProps) => {
  return (
    <div className="flex justify-between pt-6 border-t border-gray-200">
      {!isFirstStep && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
      )}
      <Button
        type="submit"
        className={`${isFirstStep ? 'ml-auto' : ''} bg-gradient-to-r from-fashion-pink to-deep-purple hover:opacity-90`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : isLastStep ? (
          'Submit Application'
        ) : (
          'Next Step'
        )}
      </Button>
    </div>
  );
};