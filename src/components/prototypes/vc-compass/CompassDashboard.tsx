'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare,
  Send,
  Plus,
  Edit3,
  Trash2,
  MoreVertical,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

interface TaskHistory {
  id: string;
  title: string;
  summary: string;
  lastUpdated: Date;
  isActive: boolean;
  messages: Message[];
}

export function CompassDashboard() {
  const [activeTaskId, setActiveTaskId] = useState<string>('task-1');
  const [inputMessage, setInputMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // サンプルタスク履歴データ
  const taskHistory: TaskHistory[] = [
    {
      id: 'task-1',
      title: 'X Capital向けピッチ構成',
      summary: 'シリーズAの投資家向けピッチデック作成',
      lastUpdated: new Date('2024-01-15T10:30:00'),
      isActive: true,
      messages: [
        {
          id: 'msg-1',
          type: 'user',
          content: 'X Capital向けのピッチ構成を作成してください。当社はFinTech系のスタートアップで、B2B SaaS事業を展開しています。',
          timestamp: new Date('2024-01-15T09:00:00')
        },
        {
          id: 'msg-2',
          type: 'ai',
          content: 'X Capital向けのピッチ構成を作成いたします。FinTech系B2B SaaSということを踏まえ、以下の構成をご提案します：\n\n**1. 問題提起**\n- 既存の財務管理の課題\n- 中小企業の経理業務の非効率性\n\n**2. ソリューション**\n- 当社SaaSプラットフォームの特徴\n- 自動化による効率化\n\n**3. 市場機会**\n- TAM/SAM/SOM分析\n- 成長率の根拠\n\n**4. 競合優位性**\n- 独自技術・特許\n- 先行者利益\n\n**5. 事業計画**\n- 今後3年間の売上予測\n- 顧客獲得戦略',
          timestamp: new Date('2024-01-15T09:15:00'),
          actions: [
            { label: 'この構成でピッチを作成', onClick: () => console.log('Create pitch') },
            { label: '構成を編集', onClick: () => console.log('Edit structure') }
          ]
        }
      ]
    },
    {
      id: 'task-2', 
      title: 'シリーズA投資家リスト',
      summary: '当社にマッチする投資家10社の選定',
      lastUpdated: new Date('2024-01-12T15:20:00'),
      isActive: false,
      messages: []
    },
    {
      id: 'task-3',
      title: 'Y Capitalとの面談準備',
      summary: '面談で想定される質問と回答準備',
      lastUpdated: new Date('2024-01-10T11:45:00'),
      isActive: false,
      messages: []
    }
  ];

  // クイックアクション
  const quickActions = [
    { id: 'list', title: '投資家リストアップ', emoji: '🗂', action: 'fundraising_investors' },
    { id: 'recommend', title: 'マッチする投資家提案', emoji: '🎯', action: 'recommend_investors' },
    { id: 'pitch', title: 'ピッチ構成作成', emoji: '📊', action: 'create_pitch' },
    { id: 'qa', title: '想定質問準備', emoji: '❓', action: 'prepare_qa' }
  ];

  const activeTask = taskHistory.find(task => task.id === activeTaskId);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      console.log('Send message:', inputMessage);
      setInputMessage('');
    }
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      'fundraising_investors': '資金調達で声をかけるべき投資家をリストアップしてください。',
      'recommend_investors': '当社にマッチする投資家を10社ピックアップして、理由も含めて教えてください。',
      'create_pitch': '投資家向けのピッチ構成を作成してください。',
      'prepare_qa': '投資家からの想定質問とその回答を準備してください。'
    };
    
    setInputMessage(actionMessages[action as keyof typeof actionMessages] || '');
  };

  return (
    <div className="min-h-screen flex relative">
      {/* モバイル用サイドバーオーバーレイ */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 左サイドバー - タスク履歴 */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* サイドバーヘッダー */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              My タスク
            </h2>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Plus className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* タスク履歴リスト */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-2">
            {taskHistory.map((task) => (
              <Card 
                key={task.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-sm ${
                  task.id === activeTaskId 
                    ? 'bg-brand-50 border-brand-200 dark:bg-brand-900/20 dark:border-brand-800' 
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTaskId(task.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-medium truncate ${
                        task.id === activeTaskId 
                          ? 'text-brand-900 dark:text-brand-100' 
                          : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {task.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {task.summary}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {task.lastUpdated.toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 ml-2">
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </aside>

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* チャットヘッダー */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {activeTask?.title || 'タスクを選択してください'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {activeTask?.summary}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Edit3 className="w-4 h-4 mr-2" />
                編集
              </Button>
              <Button size="sm" variant="ghost">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* チャットメッセージエリア */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTask?.messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div className="max-w-md">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  新しい対話を開始
                </h3>
                <p className="text-muted-foreground">
                  下のクイックアクションを使用するか、メッセージを入力してAIとの対話を始めましょう。
                </p>
              </div>
            </div>
          ) : (
            activeTask?.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-brand-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </div>
                  
                  {/* AIメッセージのアクションボタン */}
                  {message.type === 'ai' && message.actions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.actions.map((action, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          onClick={action.onClick}
                          className="h-8"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString('ja-JP', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 入力エリア */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800 p-4">
          {/* クイックアクションボタン */}
          <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                size="sm"
                variant="outline"
                onClick={() => handleQuickAction(action.action)}
                className="h-8"
              >
                <span className="mr-2">{action.emoji}</span>
                {action.title}
              </Button>
            ))}
          </div>

          {/* メッセージ入力 */}
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="メッセージを入力..."
                className="min-h-[44px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="h-[44px] px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}