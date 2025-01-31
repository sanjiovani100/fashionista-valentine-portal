import { Card } from "@/components/ui/card";

export const CardSkeleton = () => {
  return (
    <Card className="bg-black/60 border-none text-white h-full overflow-hidden">
      <div className="h-[300px] md:h-[350px] lg:h-[400px] bg-gray-800 animate-pulse rounded-t-lg" />
      <div className="p-6 space-y-4">
        <div className="h-8 bg-gray-800 rounded animate-pulse w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-5/6" />
        </div>
        <div className="h-10 bg-gray-800 rounded animate-pulse mt-4" />
      </div>
    </Card>
  );
};