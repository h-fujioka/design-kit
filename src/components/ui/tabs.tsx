'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const tabsListVariants = cva(
  'inline-flex h-9 w-fit items-center justify-center rounded-lg',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground',
        brand: 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300',
        outline: 'border border-input bg-transparent',
        underline: 'bg-transparent border-b border-gray-200 rounded-none h-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const tabsTriggerVariants = cva(
  'inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4',
  {
    variants: {
      variant: {
        default: 'text-foreground dark:text-muted-foreground data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-white',
        brand: 'text-brand-600 data-[state=active]:bg-white data-[state=active]:text-brand-700 data-[state=active]:shadow-sm focus-visible:border-brand-400 focus-visible:ring-brand-400/20 dark:data-[state=active]:bg-brand-800 dark:data-[state=active]:text-brand-100 dark:focus-visible:border-brand-600 dark:focus-visible:ring-brand-600/20',
        outline: 'text-muted-foreground data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:border-input focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring',
        underline: 'text-gray-600 border-b-2 border-transparent rounded-none h-auto py-3 px-4 font-bold data-[state=active]:text-brand-600 data-[state=active]:border-b-brand-600 data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:bg-transparent hover:text-gray-800 hover:border-b-gray-300 hover:border-t-0 hover:border-l-0 hover:border-r-0 focus-visible:ring-0 focus-visible:outline-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant, className }))}
      style={variant === 'default' ? { backgroundColor: 'oklch(0.87 0.02 240)' } : undefined}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsTriggerVariants>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, className }))}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, tabsListVariants, TabsTrigger, tabsTriggerVariants };

