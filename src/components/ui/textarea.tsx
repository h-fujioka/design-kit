import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex field-sizing-content min-h-16 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border-input bg-white dark:bg-white focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        brand: "border-brand-200 bg-white placeholder:text-brand-600 focus-visible:border-brand-400 focus-visible:ring-brand-400/20 dark:border-brand-800 dark:bg-white dark:placeholder:text-brand-400 dark:focus-visible:border-brand-600 dark:focus-visible:ring-brand-600/20",
        error: "border-destructive bg-destructive/5 placeholder:text-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20 dark:bg-destructive/10 dark:placeholder:text-destructive/40",
      },
      size: {
        default: "min-h-16 px-3 py-2",
        sm: "min-h-12 px-2 py-1.5 text-sm",
        lg: "min-h-20 px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Textarea({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
