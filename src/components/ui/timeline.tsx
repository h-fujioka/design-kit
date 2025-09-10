import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface TimelineItemProps {
  title: string;
  type: string;
  assignee: string;
  summary: string;
  date: string;
  icon?: ReactNode;
  iconColor?: string;
  iconBgColor?: string;
  className?: string;
}

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* 縦線 */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

export function TimelineItem({
  title,
  type,
  assignee,
  summary,
  date,
  icon,
  iconColor = 'text-gray-600',
  iconBgColor = 'bg-gray-100',
  className
}: TimelineItemProps) {
  return (
    <div className={cn('relative flex items-start gap-4', className)}>
      {/* アイコン */}
      <div className={cn(
        'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white',
        iconBgColor
      )}>
        {icon && (
          <div className={cn('h-4 w-4', iconColor)}>
            {icon}
          </div>
        )}
      </div>
      
      {/* コンテンツ */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* タイトルと種別タグ */}
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-gray-900">
                {title}
              </h3>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {type}
              </span>
            </div>
            
            {/* 担当者 */}
            <div className="text-sm text-gray-700 mb-1">
              {assignee}
            </div>
            
            {/* 概要 */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {summary}
            </p>
          </div>
          
          {/* 日付 */}
          <div className="text-xs text-gray-500 ml-4 flex-shrink-0">
            {date}
          </div>
        </div>
      </div>
    </div>
  );
}
