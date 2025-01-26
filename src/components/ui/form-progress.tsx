import React from 'react';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormProgressProps {
  steps: { title: string; description: string }[];
  currentStep: number;
}

export const FormProgress: React.FC<FormProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full mb-8">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200">
          <div
            className="h-full bg-fashion-pink transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep - 1;
            const isCurrent = index === currentStep - 1;

            return (
              <div
                key={step.title}
                className={cn(
                  "flex flex-col items-center",
                  (isCompleted || isCurrent) ? "text-fashion-pink" : "text-gray-400"
                )}
              >
                <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-white border-2 transition-colors duration-300"
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`Step ${index + 1}: ${step.title}`}
                  style={{
                    borderColor: isCompleted || isCurrent ? '#FF00CC' : '#E5E7EB',
                  }}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-fashion-pink" />
                  ) : (
                    <Circle className="w-6 h-6" fill={isCurrent ? "#FF00CC" : "transparent"} />
                  )}
                </div>
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs text-gray-500 text-center max-w-[120px]">
                  {step.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};