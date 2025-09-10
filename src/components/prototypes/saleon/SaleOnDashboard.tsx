"use client";

import Link from 'next/link';

export function SaleOnDashboard() {

  return (
    <div 
      className="h-[calc(100vh-3.5rem)] flex"
      style={{ backgroundColor: 'oklch(0.97 0.005 240)' }}
    >
      {/* 左サイドバー - ナビゲーション */}
      <aside 
        className="w-64 border-r flex flex-col"
        style={{ backgroundColor: 'oklch(1 0 0)' }}
      >
         <div className="py-4">
           <div className="space-y-1">
             <Link 
               href="/prototypes/saleon"
               className="w-full block px-4 py-3 text-sm text-left hover:bg-muted rounded transition-colors bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300"
             >
               <div className="flex items-center gap-3">
                 <span className="text-sm">🏠</span>
                 <span>ホーム（Todo＝タスク管理）</span>
               </div>
             </Link>
             <Link 
               href="/prototypes/saleon/cases"
               className="w-full block px-4 py-3 text-sm text-left hover:bg-muted rounded transition-colors text-card-foreground"
             >
               <div className="flex items-center gap-3">
                 <span className="text-sm">📋</span>
                 <span>案件</span>
               </div>
             </Link>
             <Link 
               href="/prototypes/saleon"
               className="w-full block px-4 py-3 text-sm text-left hover:bg-muted rounded transition-colors text-card-foreground"
             >
               <div className="flex items-center gap-3">
                 <span className="text-sm">📊</span>
                 <span>プロジェクト管理</span>
               </div>
             </Link>
             <Link 
               href="/prototypes/saleon"
               className="w-full block px-4 py-3 text-sm text-left hover:bg-muted rounded transition-colors text-card-foreground"
             >
               <div className="flex items-center gap-3">
                 <span className="text-sm">🏢</span>
                 <span>企業管理</span>
               </div>
             </Link>
             <Link 
               href="/prototypes/saleon"
               className="w-full block px-4 py-3 text-sm text-left hover:bg-muted rounded transition-colors text-card-foreground"
             >
               <div className="flex items-center gap-3">
                 <span className="text-sm">⚙️</span>
                 <span>設定</span>
               </div>
             </Link>
           </div>
         </div>
      </aside>

      {/* メインコンテンツエリア */}
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-400">
            <h1 className="text-xl font-bold text-muted-foreground">
              SaleOn Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              コンテンツは準備中です
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
