'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ArrowRight,
    Clock,
    DollarSign,
    Home,
    Lightbulb,
    Target,
    Users
} from 'lucide-react';
import { useState } from 'react';

// 型定義
interface Task {
  id: string;
  name: string;
  lastUpdate: string;
  category: string;
}

interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: string;
  emoji: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: typeof DollarSign;
  color: string;
}

// ダミーデータ
const mockTasks: Task[] = [
  {
    id: 'task-1',
    name: 'X Capital向けピッチ構成',
    lastUpdate: '2024/08/26',
    category: '資金調達・財務'
  },
  {
    id: 'task-2', 
    name: 'シリーズA投資家リスト',
    lastUpdate: '2024/08/25',
    category: '資金調達・財務'
  },
  {
    id: 'task-3',
    name: 'エンジニア採用戦略',
    lastUpdate: '2024/08/24',
    category: '組織・人事'
  },
  {
    id: 'task-4',
    name: 'Q4セールス目標設定',
    lastUpdate: '2024/08/23',
    category: '営業・マーケティング'
  }
];

const quickActions: QuickAction[] = [
  {
    id: 'qa-1',
    name: '投資家リストアップ',
    description: '業界・ステージに適した投資家を特定',
    icon: 'FolderOpen',
    emoji: '🗂'
  },
  {
    id: 'qa-2',
    name: '優先投資家レコメンド', 
    description: 'あなたの会社に最適な投資家を提案',
    icon: 'Target',
    emoji: '🎯'
  },
  {
    id: 'qa-3',
    name: 'ピッチ構成作成',
    description: '効果的なピッチデッキの構成を支援',
    icon: 'FileText', 
    emoji: '📊'
  }
];

const categories: Category[] = [
  {
    id: 'funding',
    name: '資金調達・財務',
    description: '投資家との関係構築や財務戦略',
    icon: DollarSign,
    color: 'text-info'
  },
  {
    id: 'organization',
    name: '組織・人事',
    description: '採用戦略、組織運営、人材マネジメント',
    icon: Users,
    color: 'text-success'
  },
  {
    id: 'sales',
    name: '営業・マーケティング', 
    description: 'セールス戦略、市場拡大、顧客獲得',
    icon: Target,
    color: 'text-orange-600'
  },
  {
    id: 'product',
    name: 'プロダクト・戦略',
    description: 'プロダクト開発、事業戦略の立案',
    icon: Lightbulb,
    color: 'text-purple-600'
  }
];

export function CEODashboard() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const ceoName = "田中"; // パーソナライズ用

  const handleTaskClick = (taskId: string) => {
    setSelectedTask(taskId);
    // ここでタスク履歴画面への遷移処理
    console.log(`Task ${taskId} clicked`);
  };

  const handleQuickActionClick = (actionId: string) => {
    // クイックアクション処理
    console.log(`Quick action ${actionId} clicked`);
  };

  const handleCategoryClick = (categoryId: string) => {
    // カテゴリ選択処理
    console.log(`Category ${categoryId} clicked`);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* 左サイドバー */}
      <aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* サイドバーヘッダー */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            My タスク
          </h2>
        </div>

        {/* タスクリスト */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {mockTasks.map((task) => (
            <div 
              key={task.id}
              className={`p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors ${
                selectedTask === task.id ? 'bg-info/10 dark:bg-info/20 border-l-2 border-info' : ''
              }`}
              onClick={() => handleTaskClick(task.id)}
            >
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight mb-1">
                    {task.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {task.category}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    最終更新日：{task.lastUpdate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* サイドバーフッター */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Home className="w-4 h-4 mr-2" />
            カテゴリを選択
          </Button>
        </div>
      </aside>

      {/* メインコンテンツエリア */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* ヘッダー - 歓迎メッセージ */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              お帰りなさい、{ceoName}さん
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              今日のタスクは何ですか？
            </p>
          </div>

          {/* 主要なクイックアクション */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
              よく使われるアクション
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {quickActions.map((action) => (
                <Card 
                  key={action.id}
                  className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800"
                  onClick={() => handleQuickActionClick(action.id)}
                >
                  <CardContent className="text-center">
                    <div className="text-4xl">{action.emoji}</div>
                  </CardContent>
                  <CardHeader className="text-center">
                    <CardTitle>{action.name}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <ArrowRight className="w-5 h-5 text-info mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 目的カテゴリ */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8 text-center">
              他のタスクに取り組む
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Card 
                    key={category.id}
                    className="cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 bg-white dark:bg-gray-800 group"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <CardContent className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                        <IconComponent className={`w-8 h-8 ${category.color}`} />
                      </div>
                    </CardContent>
                    <CardHeader className="text-center">
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
