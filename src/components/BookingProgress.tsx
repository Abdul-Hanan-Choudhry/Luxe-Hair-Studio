import React from 'react';
import { Check } from 'lucide-react';

interface BookingProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const BookingProgress: React.FC<BookingProgressProps> = ({ 
  currentStep, 
  totalSteps, 
  steps 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-rose-100">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${index < currentStep
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg transform scale-110'
                    : index === currentStep
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg animate-pulse'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }
                `}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5 animate-bounce" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`
                  ml-3 text-sm font-semibold transition-colors duration-300
                  ${index < currentStep 
                    ? 'text-emerald-600' 
                    : index === currentStep 
                      ? 'text-rose-600' 
                      : 'text-gray-500'
                  }
                `}
              >
                {step}
              </span>
            </div>
            
            {index < totalSteps - 1 && (
              <div
                className={`
                  w-16 h-1 mx-4 rounded-full transition-all duration-700
                  ${index < currentStep 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 shadow-sm' 
                    : 'bg-gray-200'
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};