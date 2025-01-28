import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ImageErrorBoundaryProps {
  children: React.ReactNode;
}

export const ImageErrorBoundary = ({ children }: ImageErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <Alert 
        variant="destructive" 
        className="relative aspect-video bg-gray-100"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Image failed to load
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};