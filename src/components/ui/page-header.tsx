"use client"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const pageHeaderVariants = cva(
  "flex items-center justify-between",
  {
    variants: {
      variant: {
        default: "",
        centered: "justify-center",
        left: "justify-start",
      },
      size: {
        sm: "",
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const titleVariants = cva(
  "font-bold tracking-tight",
  {
    variants: {
      size: {
        sm: "text-xl",
        default: "text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

const descriptionVariants = cva(
  "text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-sm",
        default: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

interface PageHeaderProps extends VariantProps<typeof pageHeaderVariants> {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
  showDescription?: boolean
  showAction?: boolean
  size?: "sm" | "default"
}

export function PageHeader({
  title,
  description,
  action,
  variant,
  size,
  className,
  showDescription = true,
  showAction = true,
}: PageHeaderProps) {
  const hasDescription = showDescription && description
  const hasAction = showAction && action

  return (
    <div className={cn(pageHeaderVariants({ variant, size, className }))}>
      <div className={cn(
        "flex-1",
        hasDescription ? "space-y-2" : "space-y-0"
      )}>
        <h1 className={cn(titleVariants({ size }))}>
          {title}
        </h1>
        {hasDescription && (
          <p className={cn(descriptionVariants({ size }))}>
            {description}
          </p>
        )}
      </div>
      {hasAction && (
        <div className="flex-shrink-0 ml-6">
          {action}
        </div>
      )}
    </div>
  )
}

export { pageHeaderVariants, type PageHeaderProps }
