import { Skeleton } from "@/components/ui/skeleton";

interface ContentSkeletonProps {
  rows?: number;
  className?: string;
}

export const ContentSkeleton = ({ rows = 3, className }: ContentSkeletonProps) => {
  return (
    <div className={className}>
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton
          key={index}
          className={`h-4 w-${index === 0 ? 'full' : '[85%]'} mb-4 bg-gray-200/10`}
        />
      ))}
    </div>
  );
};