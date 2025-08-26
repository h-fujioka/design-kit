import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default: 'border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        brand: 'border-brand-200 bg-brand-50/50 placeholder:text-brand-600 focus-visible:border-brand-400 focus-visible:ring-brand-400/20 dark:border-brand-800 dark:bg-brand-900/20 dark:placeholder:text-brand-400 dark:focus-visible:border-brand-600 dark:focus-visible:ring-brand-600/20',
        error: 'border-destructive bg-destructive/5 placeholder:text-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20 dark:bg-destructive/10 dark:placeholder:text-destructive/40',
      },
      size: {
        default: 'h-9 px-3 py-1',
        sm: 'h-8 px-2 py-1 text-sm',
        lg: 'h-10 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Input({ 
  className, 
  type, 
  variant,
  size,
  ...props 
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
