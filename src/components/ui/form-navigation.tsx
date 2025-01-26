import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2, Save } from 'lucide-react';
import { useFormContext } from '@/components/forms/sponsor-form/context';
import { toast } from '@/components/ui/use-toast';

interface FormNavigationProps {
  isSubmitting: boolean;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({ isSubmitting }) => {
  const { actions, navigation } = useFormContext();

  const handleSave = () => {
    actions.saveProgress();
    toast({
      title: "Progress Saved",
      description: "Your form progress has been saved. You can continue later.",
    });
  };

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      <Button
        type="button"
        variant="outline"
        onClick={actions.prevStep}
        disabled={!navigation.canGoPrev || isSubmitting}
        className="flex items-center gap-2"
        aria-label="Previous step"
      >
        <ArrowLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleSave}
          disabled={isSubmitting}
          className="flex items-center gap-2"
          aria-label="Save progress"
        >
          <Save className="w-4 h-4" />
          Save Progress
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-gradient-to-r from-fashion-pink to-deep-purple hover:opacity-90"
          aria-label={navigation.isLastStep ? "Submit form" : "Next step"}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {navigation.isLastStep ? "Submitting..." : "Saving..."}
            </>
          ) : (
            <>
              {navigation.isLastStep ? "Submit" : "Next"}
              {!navigation.isLastStep && <ArrowRight className="w-4 h-4" />}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};