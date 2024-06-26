import { Check } from 'lucide-react';
import React from 'react';

import { HTMLButtonProps, HTMLDivProps } from '@/types/html';
import { cn } from '@/utils';

import { Separator } from '../ui/separator';

interface StepNumberProps extends HTMLButtonProps {
  mode: 'complete' | 'current' | 'incomplete';
  canActivate?: (args?: unknown) => boolean;
  name?: string;
  description?: string;
}

export const StepNumber: React.FC<StepNumberProps> = ({
  children,
  onClick,
  canActivate,
  mode = 'incomplete',
  name,
  description,
}) => (
  <div className="flex gap-2">
    <button
      onClick={(event) => {
        if (canActivate && onClick && canActivate()) {
          onClick(event);
        }
      }}
      className={cn(
        'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
        mode === 'complete' && 'bg-purple-500',
        mode === 'current' && 'border-2 border-purple-500',
        mode === 'incomplete' && 'border-2 bg-white',
      )}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {mode === 'complete' ? <Check className="text-foreground" /> : children}
      </div>
    </button>
    <div className="flex flex-col">
      {name && (
        <span className="whitespace-nowrap text-sm font-semibold">{name}</span>
      )}
      {description && (
        <span className="whitespace-nowrap text-sm text-foreground">
          {description}
        </span>
      )}
    </div>
  </div>
);

interface StepperProps extends HTMLDivProps {}

export const Stepper: React.FC<StepperProps> = ({ children, className }) => {
  const steps = React.Children.toArray(children);
  const { length } = steps;

  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      {steps.map((s, index) => (
        <div
          className={cn('flex items-center', index !== length - 1 && 'w-full')}
          key={index}
        >
          {s}
          {index < length - 1 && (
            <div className="w-full px-2">
              <Separator />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
