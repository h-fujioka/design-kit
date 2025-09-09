"use client";

import { useState } from 'react';
import { CasesPage } from './CasesPage';

type ActivePage = 'home' | 'cases' | 'projects' | 'companies' | 'settings';

export function SaleOnDashboard() {
  const [activePage, setActivePage] = useState<ActivePage>('cases');

  const renderContent = () => {
    switch (activePage) {
      case 'cases':
        return <CasesPage />;
      case 'home':
      case 'projects':
      case 'companies':
      case 'settings':
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-muted-foreground mb-4">
                SaleOn Dashboard
              </h1>
              <p className="text-muted-foreground">
                コンテンツは準備中です
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex">
      {/* 左サイドバー - ナビゲーション */}
      <aside className="w-64 bg-background border-r flex flex-col">
         <div className="py-4">
           <div className="space-y-1">
             <button 
               onClick={() => setActivePage('home')}
               className={`w-full px-6 py-3 text-sm text-left hover:bg-muted rounded transition-colors ${
                 activePage === 'home' 
                   ? 'bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                   : 'text-card-foreground'
               }`}
             >
               <div className="flex items-center gap-3">
                 <span className="text-sm">🏠</span>
                 <span>ホーム（Todo＝タスク管理）</span>
               </div>
             </button>
             <button 
               onClick={() => setActivePage('cases')}
               className={`w-full px-6 py-3 text-sm text-left hover:bg-muted rounded transition-colors ${
                 activePage === 'cases' 
                   ? 'bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                   : 'text-card-foreground'
               }`}
             >
               <div className="flex items-center gap-3">
                 <span className="text-sm">📋</span>
                 <span>案件</span>
               </div>
             </button>
             <button 
               onClick={() => setActivePage('projects')}
               className={`w-full px-6 py-3 text-sm text-left hover:bg-muted rounded transition-colors ${
                 activePage === 'projects' 
                   ? 'bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                   : 'text-card-foreground'
               }`}
             >
               <div className="flex items-center gap-3">
                 <span className="text-sm">📊</span>
                 <span>プロジェクト管理</span>
               </div>
             </button>
             <button 
               onClick={() => setActivePage('companies')}
               className={`w-full px-6 py-3 text-sm text-left hover:bg-muted rounded transition-colors ${
                 activePage === 'companies' 
                   ? 'bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                   : 'text-card-foreground'
               }`}
             >
               <div className="flex items-center gap-3">
                 <span className="text-sm">🏢</span>
                 <span>企業管理</span>
               </div>
             </button>
             <button 
               onClick={() => setActivePage('settings')}
               className={`w-full px-6 py-3 text-sm text-left hover:bg-muted rounded transition-colors ${
                 activePage === 'settings' 
                   ? 'bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300' 
                   : 'text-card-foreground'
               }`}
             >
               <div className="flex items-center gap-3">
                 <span className="text-sm">⚙️</span>
                 <span>設定</span>
               </div>
             </button>
           </div>
         </div>
      </aside>

      {/* メインコンテンツエリア */}
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
