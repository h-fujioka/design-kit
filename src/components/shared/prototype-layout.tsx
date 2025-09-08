"use client"

import { ReactNode } from 'react'

interface PrototypeLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  title?: string
  description?: string
  maxWidth?: string
}

export function PrototypeLayout({ 
  children, 
  sidebar, 
  title, 
  description,
  maxWidth = "max-w-[1000px]"
}: PrototypeLayoutProps) {
  return (
    <div className="h-[calc(100vh-3.5rem)] flex">
      {sidebar && (
        <aside className="w-64 bg-background border-r flex flex-col divide-y">
          {sidebar}
        </aside>
      )}
      <main className="flex-1 w-full py-8 px-6">
        <div className={`${maxWidth} mx-auto`}>
          {(title || description) && (
            <div className="mb-6">
              {title && (
                <h1 className="text-2xl font-bold text-foreground dark:text-foreground mb-4">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  )
}

interface SidebarSectionProps {
  children: ReactNode
  title?: string
  className?: string
}

export function SidebarSection({ children, title, className = "" }: SidebarSectionProps) {
  return (
    <div className={`py-4 ${className}`}>
      {title && (
        <h3 className="px-6 text-sm font-medium text-muted-foreground mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

interface SidebarItemProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function SidebarItem({ children, onClick, className = "" }: SidebarItemProps) {
  return (
    <button 
      className={`w-full px-6 py-2 text-sm cursor-pointer hover:bg-muted rounded transition-colors text-left text-card-foreground ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

interface SidebarItemWithIconProps {
  icon: string
  label: string
  onClick?: () => void
  className?: string
}

export function SidebarItemWithIcon({ icon, label, onClick, className = "" }: SidebarItemWithIconProps) {
  return (
    <SidebarItem onClick={onClick} className={className}>
      <div className="flex items-center gap-2">
        <span className="text-sm">{icon}</span>
        <span className="flex-1 truncate">{label}</span>
      </div>
    </SidebarItem>
  )
}

interface CardGridProps {
  children: ReactNode
  columns?: {
    mobile: number
    tablet: number
    desktop: number
  }
  gap?: string
}

export function CardGrid({ 
  children, 
  columns = { mobile: 2, tablet: 3, desktop: 4 },
  gap = "gap-5"
}: CardGridProps) {
  const gridCols = `grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`
  
  return (
    <div className={`grid ${gridCols} ${gap}`}>
      {children}
    </div>
  )
}

interface PrototypeCardProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function PrototypeCard({ children, onClick, className = "" }: PrototypeCardProps) {
  return (
    <div 
      className={`flex flex-col gap-3 rounded-xl border py-5 shadow-sm bg-brand-50/50 border-brand-100 text-brand-900 dark:bg-brand-900/10 dark:border-brand-800/50 dark:text-brand-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 group ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface PrototypeCardContentProps {
  children: ReactNode
  className?: string
}

export function PrototypeCardContent({ children, className = "" }: PrototypeCardContentProps) {
  return (
    <div className={`px-5 text-center ${className}`}>
      {children}
    </div>
  )
}

interface PrototypeCardHeaderProps {
  children: ReactNode
  className?: string
}

export function PrototypeCardHeader({ children, className = "" }: PrototypeCardHeaderProps) {
  return (
    <div className={`@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-5 has-data-[slot=card-action]:grid-cols-[1fr_auto] text-center ${className}`}>
      {children}
    </div>
  )
}

interface PrototypeCardTitleProps {
  children: ReactNode
  className?: string
}

export function PrototypeCardTitle({ children, className = "" }: PrototypeCardTitleProps) {
  return (
    <div className={`!m-0 !mb-0 !mt-0 text-base font-semibold ${className}`}>
      {children}
    </div>
  )
}

interface PrototypeCardDescriptionProps {
  children: ReactNode
  className?: string
}

export function PrototypeCardDescription({ children, className = "" }: PrototypeCardDescriptionProps) {
  return (
    <div className={`text-muted-foreground text-sm leading-relaxed m-0 ${className}`}>
      {children}
    </div>
  )
}

interface PrototypeIconProps {
  icon: string
  size?: string
  className?: string
}

export function PrototypeIcon({ icon, size = "w-16 h-16", className = "" }: PrototypeIconProps) {
  return (
    <div className={`${size} bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto group-hover:bg-brand-200 dark:group-hover:bg-brand-800/40 transition-colors ${className}`}>
      <span className="text-2xl">{icon}</span>
    </div>
  )
}
