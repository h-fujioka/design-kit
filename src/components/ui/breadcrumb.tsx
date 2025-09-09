"use client"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronRight, Home } from "lucide-react"
import * as React from "react"

const breadcrumbVariants = cva(
  "flex items-center space-x-1 text-sm",
  {
    variants: {
      variant: {
        default: "",
        brand: "text-brand-600",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const breadcrumbItemVariants = cva(
  "transition-colors",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground",
        brand: "text-brand-600 hover:text-brand-700",
        current: "text-foreground font-medium",
        currentBrand: "text-brand-700 font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const breadcrumbSeparatorVariants = cva(
  "mx-1 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "",
        brand: "text-brand-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  current?: boolean
}

interface BreadcrumbProps extends VariantProps<typeof breadcrumbVariants> {
  items: BreadcrumbItem[]
  showHome?: boolean
  homeHref?: string
  separator?: React.ReactNode
  className?: string
}

export function Breadcrumb({
  items,
  showHome = false,
  homeHref = "/",
  separator,
  variant,
  size,
  className,
}: BreadcrumbProps) {
  const defaultSeparator = <ChevronRight className="h-3 w-3" />
  const actualSeparator = separator || defaultSeparator

  const allItems = showHome 
    ? [{ label: "ホーム", href: homeHref, icon: <Home className="h-3 w-3" /> }, ...items]
    : items

  return (
    <nav className={cn(breadcrumbVariants({ variant, size, className }))} aria-label="パンくずリスト">
      <ol className="flex items-center space-x-1">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          const isCurrent = item.current || isLast
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className={cn(breadcrumbSeparatorVariants({ variant }))}>
                  {actualSeparator}
                </span>
              )}
              
              {item.href && !isCurrent ? (
                <a
                  href={item.href}
                  className={cn(
                    breadcrumbItemVariants({ 
                      variant: variant === "brand" ? "brand" : "default" 
                    }),
                    "flex items-center gap-1 underline"
                  )}
                >
                  {item.icon}
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    breadcrumbItemVariants({ 
                      variant: variant === "brand" ? "currentBrand" : "current" 
                    }),
                    "flex items-center gap-1"
                  )}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.icon}
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { breadcrumbVariants, type BreadcrumbProps }
