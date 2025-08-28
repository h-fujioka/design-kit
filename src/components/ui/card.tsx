import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const cardVariants = cva(
  'flex flex-col gap-3 rounded-xl border py-5 shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        brand: 'bg-brand-50/50 border-brand-100 text-brand-900 dark:bg-brand-900/10 dark:border-brand-800/50 dark:text-brand-100',
        brandAccent: 'bg-brand-50 border-brand-200 text-brand-900 dark:bg-brand-900/20 dark:border-brand-800 dark:text-brand-100',
        outline: 'bg-transparent border-gray-200 text-gray-900 dark:border-gray-700 dark:text-gray-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Card({ 
  className, 
  variant,
  ...props 
}: React.ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-5 has-data-[slot=card-action]:grid-cols-[1fr_auto]',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ 
  className, 
  size = 'default',
  ...props 
}: React.ComponentProps<'div'> & { size?: 'sm' | 'default' | 'lg' }) {
  const sizeClasses = {
    sm: 'text-sm font-medium',
    default: 'text-base font-semibold',
    lg: 'text-lg font-semibold',
  };

  return (
    <div
      data-slot="card-title"
      className={cn('leading-tight !m-0 !mb-0 !mt-0', sizeClasses[size], className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm leading-relaxed m-0', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-5', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-5', className)}
      {...props}
    />
  );
}

export {
    Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
};

