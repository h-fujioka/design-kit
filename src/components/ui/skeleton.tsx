import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const skeletonVariants = cva(
  'animate-pulse rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-accent',
        brand: 'bg-brand-200 dark:bg-brand-800',
        muted: 'bg-muted',
        subtle: 'bg-muted/50',
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
