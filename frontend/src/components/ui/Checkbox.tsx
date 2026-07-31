import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            'mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5',
            'text-primary-500 focus:ring-primary-500/50 focus:ring-offset-surface',
            'cursor-pointer',
            className,
          )}
          {...props}
        />
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label htmlFor={checkboxId} className="text-sm font-medium text-slate-300 cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <span className="text-xs text-slate-500">{description}</span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
