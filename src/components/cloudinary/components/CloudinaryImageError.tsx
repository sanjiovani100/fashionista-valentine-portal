import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const CloudinaryImageError = () => (
  <Alert variant="destructive" className="absolute inset-0 flex items-center">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>Failed to load image</AlertDescription>
  </Alert>
);