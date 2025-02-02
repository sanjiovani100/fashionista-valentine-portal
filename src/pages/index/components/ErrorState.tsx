import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

export const ErrorState = ({ error, resetErrorBoundary }: ErrorStateProps) => {
  const navigate = useNavigate();

  const getErrorMessage = (error: Error) => {
    switch (error.message) {
      case 'Event not found':
        return 'The event you are looking for could not be found.';
      case 'Invalid UUID format':
        return 'The event ID provided is not valid.';
      case 'No event ID provided':
        return 'No event ID was provided in the URL.';
      default:
        return 'An unexpected error occurred while loading the event.';
    }
  };

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="mt-2">
          {getErrorMessage(error)}
        </AlertDescription>
        <div className="mt-4 flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/events')}
          >
            Back to Events
          </Button>
          {resetErrorBoundary && (
            <Button
              variant="default"
              onClick={resetErrorBoundary}
            >
              Try Again
            </Button>
          )}
        </div>
      </Alert>
    </div>
  );
};