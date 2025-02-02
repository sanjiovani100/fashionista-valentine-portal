import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const LoadingState = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 bg-black/40 backdrop-blur-sm border-white/10">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <p className="text-lg text-white/80 animate-pulse">
            Loading event details...
          </p>
        </div>
      </Card>
    </div>
  );
};