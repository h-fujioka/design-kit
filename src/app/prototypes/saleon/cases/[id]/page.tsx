"use client";

import casesData from '@/components/prototypes/saleon/data/cases.json';
import { FullWidthBreadcrumb } from '@/components/shared/full-width-breadcrumb';
import { SaleOnPageHeader } from '@/components/shared/saleon-page-header';
import { SaleOnSidebar } from '@/components/shared/saleon-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { BarChart3, Bot, Building, Calendar, CheckCircle, CheckSquare, ExternalLink, File, FileText, Info, Link, Mail, MessageCircle, Newspaper, User } from 'lucide-react';
import { use, useState } from 'react';

const navigationItems = [
  { id: 'info', label: '案件情報', icon: Info },
  { id: 'summary', label: '案件要約', icon: FileText },
  { id: 'files', label: 'ファイル', icon: File },
  { id: 'links', label: 'リンク', icon: Link },
  { id: 'company', label: '企業情報', icon: Building },
  { id: 'news', label: 'ニュース', icon: Newspaper },
  { id: 'tasks', label: 'タスク', icon: CheckSquare },
];

interface CaseDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CaseDetailPage({ params }: CaseDetailPageProps) {
  // paramsをPromiseから取得
  const { id } = use(params);
  const [selectedTab, setSelectedTab] = useState('info');
  
  // 案件データを取得
  const caseData = casesData.find(caseItem => caseItem.id === id) || {
    id: 'N/A',
    title: 'N/A',
    company: 'N/A',
    customerContact: 'N/A',
    salesRep: {
      name: 'N/A',
      avatar: '??'
    }
  };
  
  // 案件が見つからない場合のフォールバック
  if (!caseData) {
    return (
      <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-muted-foreground mb-4">
            案件が見つかりません
          </h1>
          <Link href="/prototypes/saleon/cases">
            <button className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors">
              案件一覧に戻る
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-[calc(100vh-3.5rem)] flex"
      style={{ backgroundColor: 'oklch(0.97 0.005 240)' }}
    >
      {/* 左サイドバー - ナビゲーション */}
      <SaleOnSidebar activeItem="cases" />

      {/* メインコンテンツエリア */}
      <main 
        className="flex-1 overflow-auto overflow-x-hidden"
        style={{ backgroundColor: 'oklch(0.97 0.005 240)' }}
      >
        <div className="p-6 overflow-x-hidden">
          <div className="polaris-section">
            {/* パンクズエリア */}
            <FullWidthBreadcrumb
              size="sm"
              items={[
                { label: 'ホーム', href: '/prototypes/saleon' },
                { label: '案件一覧', href: '/prototypes/saleon/cases' },
                { label: caseData?.title || 'N/A' }
              ]}
            />
            
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2">
              <div className="space-y-6">
                {/* ページヘッダー */}
                <SaleOnPageHeader
                  title={caseData?.title || 'N/A'}
                  actions={
                    <>
                      <Button variant="outline" size="sm">
                        共有
                      </Button>
                      <Button variant="outline" size="sm">
                        <span className="text-sm">🔖</span>
                      </Button>
                    </>
                  }
                />

                {/* 2カラムレイアウト */}
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-400">
                  {/* 左側：コミュニケーション（6/10幅） */}
                  <div className="lg:col-span-6">
                    <div className="bg-white rounded-lg border border-gray-200">
                      <div className="p-400">
                        
                        <Tabs defaultValue="timeline" className="space-y-300">
                          <TabsList variant="underline" className="grid w-full grid-cols-3">
                            <TabsTrigger variant="underline" value="timeline" className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              タイムライン
                            </TabsTrigger>
                            <TabsTrigger variant="underline" value="slack" className="flex items-center gap-2">
                              <MessageCircle className="h-4 w-4" />
                              Slack
                            </TabsTrigger>
                            <TabsTrigger variant="underline" value="email" className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              メール
                            </TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="timeline" className="space-y-400">
                            <Timeline>
                              <TimelineItem
                                title="最終提案ミーティング"
                                type="ミーティング"
                                assignee="田中博一"
                                summary="最終提案とROI説明。契約締結に向けた最終確認。"
                                date="2024/07/20"
                                icon={<Calendar className="h-4 w-4" />}
                                iconColor="text-blue-600"
                                iconBgColor="bg-blue-100"
                              />
                              
                              <TimelineItem
                                title="法務部長からの追加要件依頼"
                                type="Slack"
                                assignee="田中次郎・#abc-legal・3件"
                                summary="契約書レビュー機能の追加要件確認。社内規定との自動照合機能を追加希望。"
                                date="2024/07/19"
                                icon={<MessageCircle className="h-4 w-4" />}
                                iconColor="text-purple-600"
                                iconBgColor="bg-purple-100"
                              />
                              
                              <TimelineItem
                                title="提案書レビュー完了"
                                type="メール"
                                assignee="佐藤太郎"
                                summary="初回提案書のレビューが完了しました。いくつかの修正点についてご連絡いたします。"
                                date="2024/07/18"
                                icon={<Mail className="h-4 w-4" />}
                                iconColor="text-green-600"
                                iconBgColor="bg-green-100"
                              />
                              
                              <TimelineItem
                                title="競合分析レポート"
                                type="分析"
                                assignee="Sela"
                                summary="競合他社の機能比較と価格分析を実施。我々の優位性を明確化。"
                                date="2024/07/17"
                                icon={<BarChart3 className="h-4 w-4" />}
                                iconColor="text-orange-600"
                                iconBgColor="bg-orange-100"
                              />
                              
                              <TimelineItem
                                title="AI生成提案書"
                                type="AI生成"
                                assignee="Sela"
                                summary="過去の類似案件データを基に、カスタマイズされた提案書を自動生成しました。"
                                date="2024/07/16"
                                icon={<Bot className="h-4 w-4" />}
                                iconColor="text-indigo-600"
                                iconBgColor="bg-indigo-100"
                              />
                              
                              <TimelineItem
                                title="契約条件承認"
                                type="承認済み"
                                assignee="佐藤美咲"
                                summary="法務部による契約条件の最終承認が完了しました。"
                                date="2024/07/15"
                                icon={<CheckCircle className="h-4 w-4" />}
                                iconColor="text-green-600"
                                iconBgColor="bg-green-100"
                              />
                            </Timeline>
                            
                            {/* コメント入力欄 */}
                            <div className="border-t pt-6">
                              <div className="flex gap-3">
                                <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                                  <User className="h-4 w-4 text-brand-600" />
                                </div>
                                <div className="flex-1">
                                  <Textarea 
                                    variant="brand"
                                    placeholder="コメントを追加..."
                                    className="min-h-[80px] resize-none"
                                  />
                                  <div className="flex justify-end mt-2">
                                    <Button variant="brand" size="sm">送信</Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="slack" className="space-y-400">
                            <div className="text-center py-8 text-muted-foreground">
                              Slackのメッセージがここに表示されます
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="email" className="space-y-400">
                            <div className="text-center py-8 text-muted-foreground">
                              メールの履歴がここに表示されます
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                  
                  {/* 右側：基本情報（4/10幅） */}
                  <div className="lg:col-span-4">
                    <Card className="bg-white">
                      <CardContent>
                        <div className="space-y-400">
                          {/* レイアウト */}
                          <div className="flex gap-300">
                            {/* 基本情報エリア */}
                            <div className="flex-1">
                              <div className="space-y-300">
                                {/* タイトル */}
                                <div>
                                  <h3 className="text-lg font-semibold">
                                    {navigationItems.find(item => item.id === selectedTab)?.label || '基本情報'}
                                  </h3>
                                </div>
                                <div className="space-y-100">
                                  <div className="text-sm text-muted-foreground font-bold">案件ID</div>
                                  <div className="text-sm font-medium">{caseData?.id || 'N/A'}</div>
                                </div>
                                <div className="space-y-100">
                                  <div className="text-sm text-muted-foreground font-bold">案件担当者</div>
                                  <div className="flex items-center gap-200">
                                    <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center text-xs font-medium text-brand-800">
                                      {caseData?.salesRep?.avatar || '??'}
                                    </div>
                                    <span className="text-sm">{caseData?.salesRep?.name || 'N/A'}</span>
                                  </div>
                                </div>
                                <div className="space-y-100">
                                  <div className="text-sm text-muted-foreground font-bold">案件関与者</div>
                                  <div className="flex items-center gap-200">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium text-green-800">
                                      HT
                                    </div>
                                    <span className="text-sm">Hirokazu Tanaka</span>
                                  </div>
                                </div>
                                <div className="space-y-100">
                                  <div className="text-sm text-muted-foreground font-bold">企業名</div>
                                  <div className="text-sm font-medium">{caseData?.company || 'N/A'}</div>
                                </div>
                                <div className="space-y-100">
                                  <div className="text-sm text-muted-foreground font-bold">顧客担当者</div>
                                  <div className="text-sm font-medium">{caseData?.customerContact || 'N/A'}</div>
                                </div>
                                <div className="space-y-100">
                                  <div className="text-sm text-muted-foreground font-bold">顧客関係者</div>
                                  <div className="space-y-1">
                                    <div className="text-sm">佐藤二郎（主担当）</div>
                                    <div className="text-sm">山田花子（副担当）</div>
                                  </div>
                                </div>
                                <div className="space-y-100">
                                  <div className="text-sm text-muted-foreground font-bold">プロジェクト</div>
                                  <div className="flex items-center gap-200">
                                    <span className="text-sm">LegalOn Cloud導入</span>
                                    <Button variant="outline" size="sm">
                                      <ExternalLink className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="space-y-100">
                                  <div className="text-sm text-muted-foreground font-bold">説明</div>
                                  <p className="text-sm text-muted-foreground">
                                    {caseData?.title || 'N/A'}に関する案件です。{caseData?.company || 'N/A'}様との契約に関する業務を進めています。
                                    詳細な内容については、担当者までお問い合わせください。
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {/* アイコンナビゲーションエリア */}
                            <div className="flex justify-center">
                              <div className="flex flex-col gap-100">
                                {navigationItems.map((item) => {
                                  const IconComponent = item.icon;
                                  return (
                                    <button 
                                      key={item.id}
                                      className={`w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors relative group ${
                                        selectedTab === item.id ? 'bg-gray-100' : ''
                                      }`}
                                      title={item.label}
                                      onClick={() => setSelectedTab(item.id)}
                                    >
                                      <IconComponent className="h-5 w-5 text-gray-600" />
                                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-200 px-200 py-100 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {item.label}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                          
                          {/* 作業履歴・コメントタブ（2カラムの下に配置） */}
                          <div className="space-y-300 border-t">
                            <Tabs defaultValue="history" className="w-full">
                              <TabsList variant="default" className="grid w-full grid-cols-2">
                                <TabsTrigger variant="default" value="history">作業履歴</TabsTrigger>
                                <TabsTrigger variant="default" value="comments">コメント</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="history" className="space-y-200 mt-300">
                                <div className="space-y-200">
                                  <div className="flex items-start gap-200">
                                    <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                                      <User className="h-4 w-4 text-brand-600" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-200 mb-100">
                                        <span className="text-sm font-medium">田中太郎</span>
                                        <span className="text-xs text-muted-foreground">2時間前</span>
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        顧客との初回面談を実施しました。要件の詳細を確認し、提案書の準備を進めます。
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-200">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-200 mb-100">
                                        <span className="text-sm font-medium">佐藤花子</span>
                                        <span className="text-xs text-muted-foreground">1日前</span>
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        提案書の初稿を作成しました。レビューの準備が整いました。
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="comments" className="space-y-200 mt-300">
                                <div className="space-y-200">
                                  <div className="flex items-start gap-200">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                      <MessageCircle className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-200 mb-100">
                                        <span className="text-sm font-medium">山田次郎</span>
                                        <span className="text-xs text-muted-foreground">3時間前</span>
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        予算について確認が必要です。次回の会議で詳細を話し合いましょう。
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-200">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                      <Mail className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-200 mb-100">
                                        <span className="text-sm font-medium">鈴木一郎</span>
                                        <span className="text-xs text-muted-foreground">5時間前</span>
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        顧客から追加の要件が届きました。内容を確認して対応方針を検討します。
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                            
                            {/* 投稿フォーム */}
                            <div className="border-t">
                              <div className="flex gap-200 pt-300">
                                <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                                  <User className="h-4 w-4 text-brand-600" />
                                </div>
                                <div className="flex-1 space-y-200">
                                  <Textarea 
                                    variant="brand"
                                    placeholder="作業内容やコメントを入力してください..."
                                    className="min-h-[80px] resize-none"
                                  />
                                  <div className="flex justify-end">
                                    <Button variant="brand" size="sm">投稿</Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
  );
}
