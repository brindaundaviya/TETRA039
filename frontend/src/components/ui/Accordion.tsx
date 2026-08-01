import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/helpers';

export interface AccordionItemProps {
  id: string;
  question: string;
  answer: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function AccordionItem({
  question,
  answer,
  isOpen = false,
  onToggle,
  className,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        'rounded-2xl glass-card transition-all duration-300 border border-white/10 overflow-hidden',
        isOpen ? 'border-primary-500/40 shadow-glow bg-white/[0.07]' : 'hover:border-white/20',
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 rounded-2xl"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-semibold text-slate-100 pr-4">
          {question}
        </span>
        <span
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-full glass flex items-center justify-center transition-transform duration-300',
            isOpen ? 'rotate-180 bg-primary-500/20 text-primary-400' : 'text-slate-400'
          )}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5 mt-1">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: Array<{
    id: string;
    question: string;
    answer: ReactNode;
  }>;
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, defaultOpenId, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openIds.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
