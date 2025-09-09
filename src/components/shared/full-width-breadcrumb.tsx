"use client";

import { Breadcrumb } from '@/components/ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface FullWidthBreadcrumbProps {
  items: BreadcrumbItem[];
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function FullWidthBreadcrumb({ 
  items, 
  size = 'sm',
  className = ''
}: FullWidthBreadcrumbProps) {
  return (
    <div className={`w-screen bg-background border-b px-6 py-4 -ml-6 -mr-6 -mt-6 mb-6 ${className}`}>
      <Breadcrumb size={size} items={items} />
    </div>
  );
}
