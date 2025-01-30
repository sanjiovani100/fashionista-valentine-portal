import { Skeleton } from "@/components/ui/skeleton";

export const CardSkeleton = () => {
  return (
    <div className="space-y-5 p-4">
      <Skeleton className="h-[200px] w-full rounded-lg bg-gray-200/10" />
      <div className="space-y-3">
        <Skeleton className="h-5 w-[250px] bg-gray-200/10" />
        <Skeleton className="h-4 w-[200px] bg-gray-200/10" />
      </div>
    </div>
  );
};