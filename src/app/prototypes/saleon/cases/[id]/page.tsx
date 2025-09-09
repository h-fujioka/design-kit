"use client";

import casesData from '@/components/prototypes/saleon/data/cases.json';
import { FullWidthBreadcrumb } from '@/components/shared/full-width-breadcrumb';
import { SaleOnPageHeader } from '@/components/shared/saleon-page-header';
import { SaleOnSidebar } from '@/components/shared/saleon-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Clock, ExternalLink, Mail, MessageCircle, User } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

interface CaseDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CaseDetailPage({ params }: CaseDetailPageProps) {
  // paramsをPromiseから取得
  const { id } = use(params);
  
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
    <div className="h-[calc(100vh-3.5rem)] flex">
      {/* 左サイドバー - ナビゲーション */}
      <SaleOnSidebar activeItem="cases" />

      {/* メインコンテンツエリア */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="space-y-6">
            {/* パンクズエリア */}
            <FullWidthBreadcrumb
              size="sm"
              items={[
                { label: 'ホーム', href: '/prototypes/saleon' },
                { label: '案件一覧', href: '/prototypes/saleon/cases' },
                { label: caseData?.title || 'N/A' }
              ]}
            />

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
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* 左側：コミュニケーション欄（2/3幅） */}
              <div className="xl:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>コミュニケーション</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="timeline" className="space-y-4">
                      <TabsList variant="brand">
                        <TabsTrigger variant="brand" value="timeline">タイムライン</TabsTrigger>
                        <TabsTrigger variant="brand" value="slack">Slack</TabsTrigger>
                        <TabsTrigger variant="brand" value="email">メール</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="timeline" className="space-y-4">
                        {/* タイムラインコンテンツ */}
                        <div className="space-y-4">
                          {/* メールアイテム */}
                          <div className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Mail className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm">佐藤二郎</div>
                                  <div className="text-xs text-muted-foreground">2025年1月15日 14:30</div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-1">契約条件についてのご相談</h4>
                              <p className="text-sm text-muted-foreground">
                                いつもお世話になっております。契約条件についてご相談がございます...
                              </p>
                            </div>
                            
                            {/* コメントスレッド */}
                            <div className="ml-11 space-y-3">
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                  <User className="h-3 w-3 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-xs">Hirokazu Tanaka</span>
                                    <span className="text-xs text-muted-foreground">2025年1月15日 15:45</span>
                                  </div>
                                  <p className="text-sm">ディスカウント依頼について質問があります。どの程度の割引が可能でしょうか？</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                  <Bot className="h-3 w-3 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-xs">Sela (AI)</span>
                                    <span className="text-xs text-muted-foreground">2025年1月15日 15:46</span>
                                  </div>
                                  <p className="text-sm">過去の類似案件では5-10%のディスカウントが適用されています。詳細な提案書を作成しましょうか？</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Slackアイテム */}
                          <div className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                  <MessageCircle className="h-4 w-4 text-purple-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm">田中太郎</div>
                                  <div className="text-xs text-muted-foreground">2025年1月15日 10:15</div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-1">#sales-team</h4>
                              <p className="text-sm text-muted-foreground">
                                クロステック案件の進捗について共有します。来週の打ち合わせの準備をお願いします。
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* コメント入力欄 */}
                        <div className="border-t pt-4">
                          <div className="flex gap-3">
                            <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-brand-600" />
                            </div>
                            <div className="flex-1">
                              <Textarea 
                                placeholder="コメントを追加..."
                                className="min-h-[80px] resize-none"
                              />
                              <div className="flex justify-end mt-2">
                                <Button size="sm">送信</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="slack" className="space-y-4">
                        <div className="text-center py-8 text-muted-foreground">
                          Slackのメッセージがここに表示されます
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="email" className="space-y-4">
                        <div className="text-center py-8 text-muted-foreground">
                          メールの履歴がここに表示されます
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              {/* 右側：案件情報欄（1/3幅） */}
              <div className="xl:col-span-1">
                <div className="space-y-6">
                  {/* 基本情報 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>基本情報</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">案件ID</div>
                        <div className="text-sm font-medium">{caseData?.id || 'N/A'}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">案件担当者</div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center text-xs font-medium text-brand-800">
                            {caseData?.salesRep?.avatar || '??'}
                          </div>
                          <span className="text-sm">{caseData?.salesRep?.name || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">案件関与者</div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium text-green-800">
                            HT
                          </div>
                          <span className="text-sm">Hirokazu Tanaka</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">企業名</div>
                        <div className="text-sm font-medium">{caseData?.company || 'N/A'}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">顧客担当者</div>
                        <div className="text-sm font-medium">{caseData?.customerContact || 'N/A'}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">顧客関係者</div>
                        <div className="space-y-1">
                          <div className="text-sm">佐藤二郎（主担当）</div>
                          <div className="text-sm">山田花子（副担当）</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">プロジェクト</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">LegalOn Cloud導入</span>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* 説明欄 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>説明</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {caseData?.title || 'N/A'}に関する案件です。{caseData?.company || 'N/A'}様との契約に関する業務を進めています。
                        詳細な内容については、担当者までお問い合わせください。
                      </p>
                    </CardContent>
                  </Card>
                  
                  {/* コメント & 作業履歴 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>コメント & 作業履歴</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* コメント入力 */}
                      <div className="space-y-2">
                        <Textarea 
                          placeholder="コメントを追加..."
                          className="min-h-[60px] resize-none"
                        />
                        <div className="flex justify-end">
                          <Button size="sm">追加</Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* 作業履歴 */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <Clock className="h-3 w-3 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground">2025年1月10日</div>
                            <div className="text-sm">CorporeteOnも関心あり</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <Clock className="h-3 w-3 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground">2025年1月8日</div>
                            <div className="text-sm">初回提案書を送付</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                            <Clock className="h-3 w-3 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground">2025年1月5日</div>
                            <div className="text-sm">案件を開始</div>
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
      </main>
    </div>
  );
}
