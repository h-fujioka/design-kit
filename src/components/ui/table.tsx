"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tableVariants = cva(
  "w-full caption-bottom text-sm border-collapse",
  {
    variants: {
      variant: {
        default: "",
        brand: "[&_thead]:bg-brand-50 dark:[&_thead]:bg-brand-900/20 [&_th]:border-brand-200 dark:[&_th]:border-brand-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Table({ 
  className, 
  variant,
  ...props 
}: React.ComponentProps<"table"> & VariantProps<typeof tableVariants>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn(tableVariants({ variant, className }))}
        {...props}
      />
    </div>
  )
}

const tableHeaderVariants = cva(
  "[&_tr]:border-b",
  {
    variants: {
      variant: {
        default: "",
        brand: "bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function TableHeader({ 
  className, 
  variant,
  ...props 
}: React.ComponentProps<"thead"> & VariantProps<typeof tableHeaderVariants>) {
  return (
    <thead
      data-slot="table-header"
      className={cn(tableHeaderVariants({ variant, className }))}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  tableVariants,
  tableHeaderVariants,
}
