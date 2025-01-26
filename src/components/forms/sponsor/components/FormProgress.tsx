import React from 'react';
import { motion } from 'framer-motion';

interface FormProgressProps {
  steps: { title: string }[];
  currentStep: number;
}

export const FormProgress = ({ steps, currentStep }: FormProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <div className="flex flex-col items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${index <= currentStep 
                  ? 'bg-fashion-pink text-white' 
                  : 'bg-gray-200 text-gray-500'}
              `}>
                {index + 1}
              </div>
              <span className="text-sm mt-2">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-0.5 bg-gray-200">
                <motion.div
                  className="h-full bg-fashion-pink"
                  initial={{ width: "0%" }}
                  animate={{ width: index < currentStep ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};