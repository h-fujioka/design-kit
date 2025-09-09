"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // ホームページの場合はパンくずリストを表示しない
    if (pathname === '/') {
      return null;
    }

    // SaleOnをルートとして設定
    breadcrumbs.push({
      label: 'SaleOn',
      href: '/',
      isLast: false
    });

    // セグメント名を日本語に変換する関数
    const getSegmentLabel = (segment: string) => {
      const labelMap: Record<string, string> = {
        'prototypes': 'プロトタイプ',
        'saleon': 'SaleOn',
        'vc-compass': 'VC Compass',
        'styleguide': 'Styleguide',
        'cases': '案件管理',
        'projects': 'プロジェクト管理',
        'companies': '企業管理',
        'settings': '設定',
        'home': 'ホーム',
        'tasks': 'タスク管理',
        'opportunities': '案件',
        'contacts': '担当者',
        'products': '商材',
        'reports': 'レポート',
        'analytics': '分析',
        'dashboard': 'ダッシュボード'
      };
      return labelMap[segment] || segment;
    };

    // 現在のページ名を取得する関数
    const getCurrentPageName = () => {
      // SaleOnのメインページの場合
      if (pathname === '/prototypes/saleon') {
        return '案件管理'; // デフォルトで案件管理を表示
      }
      
      // 最後のセグメントを現在のページ名として使用
      const lastSegment = segments[segments.length - 1];
      return getSegmentLabel(lastSegment);
    };

    // 現在のページ名を追加
    const currentPageName = getCurrentPageName();
    if (currentPageName && currentPageName !== 'SaleOn') {
      breadcrumbs.push({
        label: currentPageName,
        href: pathname,
        isLast: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="bg-background/60 supports-[backdrop-filter]:bg-background/50 sticky top-0 z-40 border-b backdrop-blur w-full">
      <div className="w-full flex items-center justify-start py-4 px-4 md:px-6 lg:px-8">
        {breadcrumbs && (
          <nav className="text-xs">
            <ol className="flex items-center space-x-1">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.href} className="flex items-center">
                  {index > 0 && <span className="mx-1 text-muted-foreground">/</span>}
                  {breadcrumb.isLast ? (
                    <span className="text-muted-foreground">{breadcrumb.label}</span>
                  ) : (
                    <Link 
                      href={breadcrumb.href} 
                      className="text-brand-600 hover:text-brand-700 transition-colors underline"
                    >
                      {breadcrumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </header>
  );
}
