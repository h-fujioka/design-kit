"use client";

import Link from 'next/link';

interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

interface SaleOnSidebarProps {
  activeItem: string;
  items?: SidebarItem[];
}

const defaultItems: SidebarItem[] = [
  {
    id: 'home',
    label: 'ホーム（Todo＝タスク管理）',
    href: '/prototypes/saleon',
    icon: '🏠'
  },
  {
    id: 'cases',
    label: '案件',
    href: '/prototypes/saleon/cases',
    icon: '📋'
  },
  {
    id: 'projects',
    label: 'プロジェクト管理',
    href: '/prototypes/saleon',
    icon: '📊'
  },
  {
    id: 'companies',
    label: '企業管理',
    href: '/prototypes/saleon',
    icon: '🏢'
  },
  {
    id: 'settings',
    label: '設定',
    href: '/prototypes/saleon',
    icon: '⚙️'
  }
];

export function SaleOnSidebar({ activeItem, items = defaultItems }: SaleOnSidebarProps) {
  return (
    <aside className="w-64 bg-background border-r flex flex-col">
      <div className="py-4">
        <div className="space-y-1">
          {items.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full block px-4 py-3 text-sm text-left hover:bg-muted rounded transition-colors ${
                  isActive
                    ? 'bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300'
                    : 'text-card-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
