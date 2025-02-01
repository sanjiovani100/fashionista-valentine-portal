import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface CloudinaryImageErrorProps {
  error?: Error;
}

export const CloudinaryImageError = ({ error }: CloudinaryImageErrorProps) => {
  useEffect(() => {
    toast.error("Failed to load image. Using placeholder instead.");
  }, []);

  return (
    <Alert variant="destructive" className="flex items-center justify-center h-full">
      <AlertCircle className="h-4 w-4 mr-2" />
      <AlertDescription>
        {error?.message || "Failed to load image"}
      </AlertDescription>
    </Alert>
  );
};