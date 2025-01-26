import React from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection = ({
  title,
  description,
  children,
  className
}: FormSectionProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <h3 className="text-2xl font-playfair">{title}</h3>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="grid gap-6">
        {children}
      </div>
    </div>
  );
};