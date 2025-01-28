import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ImageErrorBoundaryProps {
  children: React.ReactNode;
}

export const ImageErrorBoundary = ({ children }: ImageErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <Alert variant="destructive" className="relative aspect-video bg-gray-100">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load image</AlertDescription>
      </Alert>
    );
  }

  return (
    <div onError={() => setHasError(true)}>
      {children}
    </div>
  );
};