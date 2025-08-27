"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer shrink-0 rounded-[4px] border shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        brand: "border-brand-300 dark:bg-brand-900/20 data-[state=checked]:bg-[oklch(0.4_0.06_240)] data-[state=checked]:text-white data-[state=checked]:border-[oklch(0.4_0.06_240)] focus-visible:border-brand-400 focus-visible:ring-brand-400/20 dark:border-brand-600 dark:data-[state=checked]:bg-[oklch(0.4_0.06_240)]",
        error: "border-destructive bg-destructive/5 data-[state=checked]:bg-destructive data-[state=checked]:border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 dark:bg-destructive/10",
      },
      size: {
        default: "size-4",
        sm: "size-3",
        lg: "size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Checkbox({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ variant, size, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className={cn(
          "transition-none",
          size === "sm" ? "size-2.5" : size === "lg" ? "size-4" : "size-3.5"
        )} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, checkboxVariants }
