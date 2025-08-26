'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const separatorVariants = cva(
  'shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
  {
    variants: {
      variant: {
        default: 'bg-border',
        brand: 'bg-brand-200 dark:bg-brand-800',
        muted: 'bg-muted',
        strong: 'bg-foreground/20 dark:bg-foreground/20',
      },
      size: {
        default: 'data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px',
        sm: 'data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5',
        lg: 'data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & VariantProps<typeof separatorVariants>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Separator, separatorVariants };
