import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ErrorStateProps {
  error: Error;
  showBackButton?: boolean;
}

export const ErrorState = ({ error, showBackButton = true }: ErrorStateProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/events");
    toast.info("Redirected to events page");
  };

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-4">
        <Alert variant="destructive" className="border-red-600/50 bg-red-500/10">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold text-red-500">
            Error Loading Event
          </AlertTitle>
          <AlertDescription className="mt-2 text-base text-red-100/90">
            {error.message}
          </AlertDescription>
        </Alert>
        
        {showBackButton && (
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleBack}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              Back to Events
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};