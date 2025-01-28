import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const CloudinaryImageError = () => (
  <Alert 
    variant="destructive" 
    className="absolute inset-0 flex items-center bg-opacity-90 backdrop-blur-sm"
  >
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>
      Unable to load image. Please try again later.
    </AlertDescription>
  </Alert>
);