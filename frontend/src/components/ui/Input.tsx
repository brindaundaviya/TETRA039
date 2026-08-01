import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const generatedId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hintId = generatedId ? `${generatedId}-hint` : undefined;
    const errorId = generatedId ? `${generatedId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={generatedId} className="text-sm font-semibold text-slate-200">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={generatedId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={cn(
            'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5',
            'text-sm text-white placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/60 focus:border-primary-500',
            'transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500/60 focus:ring-red-500/60',
            className,
          )}
          {...props}
        />
        {hint && !error && (
          <p id={hintId} className="text-xs text-slate-400">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-xs font-medium text-red-400 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
