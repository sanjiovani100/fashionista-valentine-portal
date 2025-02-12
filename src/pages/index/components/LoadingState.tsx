import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Loader2 className="w-8 h-8 animate-spin text-red-deep" />
    </div>
  );
};


