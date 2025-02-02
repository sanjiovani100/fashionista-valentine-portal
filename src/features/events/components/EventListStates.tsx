import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { CardSkeleton } from '@/components/ui/loading-skeleton/CardSkeleton';

interface LoadingStateProps {
  viewMode: 'grid' | 'list';
}

export const LoadingState = ({ viewMode }: LoadingStateProps) => (
  <div className={`grid gap-6 ${
    viewMode === 'grid' 
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
      : 'grid-cols-1'
  }`}>
    {[...Array(6)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const ErrorState = () => (
  <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>
      Failed to load events. Please try refreshing the page.
    </AlertDescription>
  </Alert>
);

export const EmptyState = () => (
  <Alert className="bg-white/5 backdrop-blur-sm border-white/10">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>No events found matching your criteria.</AlertDescription>
  </Alert>
);