import type { ReactNode } from 'react';
import { useState } from 'react';

export type PaymentMethodButtonProps = {
  icon: ReactNode;
  title: string;
};

export const PaymentMethodButton = ({ icon, title }: PaymentMethodButtonProps) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <button
      onClick={() => setIsSelected(!isSelected)}
      className={`
        group relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300
        ${isSelected 
          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/25' 
          : 'border-default-300 hover:border-primary/50 hover:shadow-md'
        }
      `}
    >
      {/* Icon Container */}
      <div className={`
        w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
        ${isSelected 
          ? 'bg-primary text-white' 
          : 'bg-default-100 text-default-600 group-hover:bg-primary/10 group-hover:text-primary'
        }
      `}>
        {icon}
      </div>
      
      {/* Title */}
      <span className={`
        text-xs font-semibold text-center transition-colors duration-300
        ${isSelected ? 'text-primary' : 'text-foreground'}
      `}>
        {title}
      </span>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <svg 
            className="w-4 h-4 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
      )}
    </button>
  );
}
