import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";

interface ErrorStateProps {
  error: Error;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Event</AlertTitle>
          <AlertDescription>
            {error?.message || "Event data could not be loaded. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    </PageLayout>
  );
};