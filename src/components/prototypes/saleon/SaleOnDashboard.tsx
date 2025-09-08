export function SaleOnDashboard() {
  return (
    <div className="h-[calc(100vh-3.5rem)] flex">
      {/* 左サイドバー - ナビゲーション */}
      <aside className="w-64 bg-background border-r flex flex-col">
         <div className="py-4">
           <div className="space-y-1">
             <button className="w-full px-6 py-3 text-sm text-left hover:bg-muted rounded transition-colors bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300">
               <div className="flex items-center gap-3">
                 <span className="text-sm">🏠</span>
                 <span>ホーム（Todo＝タスク管理）</span>
               </div>
             </button>
             <button className="w-full px-6 py-3 text-sm text-left hover:bg-muted rounded transition-colors text-card-foreground">
               <div className="flex items-center gap-3">
                 <span className="text-sm">📋</span>
                 <span>案件</span>
               </div>
             </button>
             <button className="w-full px-6 py-3 text-sm text-left hover:bg-muted rounded transition-colors text-card-foreground">
               <div className="flex items-center gap-3">
                 <span className="text-sm">📊</span>
                 <span>プロジェクト管理</span>
               </div>
             </button>
             <button className="w-full px-6 py-3 text-sm text-left hover:bg-muted rounded transition-colors text-card-foreground">
               <div className="flex items-center gap-3">
                 <span className="text-sm">🏢</span>
                 <span>企業管理</span>
               </div>
             </button>
             <button className="w-full px-6 py-3 text-sm text-left hover:bg-muted rounded transition-colors text-card-foreground">
               <div className="flex items-center gap-3">
                 <span className="text-sm">⚙️</span>
                 <span>設定</span>
               </div>
             </button>
           </div>
         </div>
      </aside>

      {/* メインコンテンツエリア */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-muted-foreground mb-4">
            SaleOn Dashboard
          </h1>
          <p className="text-muted-foreground">
            コンテンツは準備中です
          </p>
        </div>
      </main>
    </div>
  );
}
