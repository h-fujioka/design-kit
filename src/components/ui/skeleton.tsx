import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const skeletonVariants = cva(
  'animate-pulse rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-accent dark:bg-accent/80',
        brand: 'bg-brand-200 dark:bg-brand-600',
        muted: 'bg-muted dark:bg-muted/80',
        subtle: 'bg-muted/50 dark:bg-muted/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Skeleton({ 
  className, 
  variant,
  ...props 
}: React.ComponentProps<'div'> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
