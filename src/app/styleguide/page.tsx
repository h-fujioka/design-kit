"use client"

import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { PageShell } from '@/components/shared/page-shell';
import {
  PrototypeLayout,
  SidebarItem,
  SidebarItemWithIcon,
  SidebarSection
} from '@/components/shared/prototype-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ColumnDef } from "@tanstack/react-table";

// Lucide Icons for demonstration
import {
  AlertTriangle,
  Check,
  ChevronLeft, ChevronRight,
  Edit,
  Plus,
  Search,
  Settings,
  Trash2,
  X
} from 'lucide-react';

// サンプルデータ型
type SampleData = {
  id: string
  name: string
  status: string
  amount: number
}

const sampleData: SampleData[] = [
  { id: "1", name: "プロジェクトA", status: "進行中", amount: 1200000 },
  { id: "2", name: "プロジェクトB", status: "完了", amount: 850000 },
  { id: "3", name: "プロジェクトC", status: "計画中", amount: 2100000 },
]

const sampleColumns: ColumnDef<SampleData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        variant="brand"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="全て選択"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        variant="brand"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="行を選択"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "プロジェクト名",
  },
  {
    accessorKey: "status",
    header: "ステータス",
    cell: ({ row }) => (
      <span className={
        row.getValue("status") === "完了" ? "text-success" :
        row.getValue("status") === "進行中" ? "text-info" : "text-brand-500"
      }>
        {row.getValue("status")}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "予算",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(amount)
      return formatted
    },
  },
]

export default function StyleguidePage() {
  return (
    <>
      <Header />
      <PageShell>
        <section className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Styleguide
            </h1>
            <p className="text-muted-foreground">
              Shopify Polaris-inspired design system with 4px grid spacing
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card variant="brand">
              <CardHeader>
                <CardTitle>Design System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Shopify Polarisにインスパイアされたコンポーネント、4pxグリッドスペーシング、
                  Appleスタイルのカラーパレットを特徴とする包括的なデザインシステムをご覧ください。
                </p>
              </CardContent>
            </Card>

            <Card variant="brandAccent">
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 4pxベースのスペーシングシステム</li>
                  <li>• Shopify Polarisレイアウトコンポーネント</li>
                  <li>• Appleインスパイアのカラーパレット</li>
                  <li>• レスポンシブデザインパターン</li>
                  <li>• アクセシビリティファーストアプローチ</li>
                  <li>• セマンティックカラーシステム（プリミティブカラーよりセマンティックカラーを使用）</li>
                  <li>• コンポーネントバリアントルール（brand, brandOutline, brandGhost, brandLink, brandAccentの一貫した使用）</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Breadcrumb Navigation - パンくずリスト</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Standard Breadcrumb - 標準パンくずリスト</h4>
                  <div className="space-y-4">
                    {/* サンプル1: 基本的なパンくずリスト */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">基本的なパンくずリスト</p>
                      <nav className="text-xs">
                        <ol className="flex items-center space-x-1">
                          <li>
                            <a href="/" className="text-brand-600 hover:text-brand-700 transition-colors underline">
                              ホーム
                            </a>
                          </li>
                          <li className="flex items-center">
                            <span className="mx-1 text-muted-foreground">/</span>
                            <span className="text-muted-foreground">Styleguide</span>
                          </li>
                        </ol>
                      </nav>
                    </div>
                    
                    {/* サンプル2: 3階層のパンくずリスト */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">3階層のパンくずリスト</p>
                      <nav className="text-xs">
                        <ol className="flex items-center space-x-1">
                          <li>
                            <a href="/" className="text-brand-600 hover:text-brand-700 transition-colors underline">
                              ホーム
                            </a>
                          </li>
                          <li className="flex items-center">
                            <span className="mx-1 text-muted-foreground">/</span>
                            <a href="/components" className="text-brand-600 hover:text-brand-700 transition-colors underline">
                              コンポーネント
                            </a>
                          </li>
                          <li className="flex items-center">
                            <span className="mx-1 text-muted-foreground">/</span>
                            <span className="text-muted-foreground">ボタン</span>
                          </li>
                        </ol>
                      </nav>
                    </div>
                    
                    {/* サンプル3: アイコン付きパンくずリスト */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">アイコン付きパンくずリスト</p>
                      <nav className="text-xs">
                        <ol className="flex items-center space-x-1">
                          <li>
                            <a href="/" className="text-brand-600 hover:text-brand-700 transition-colors underline flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              ホーム
                            </a>
                          </li>
                          <li className="flex items-center">
                            <span className="mx-1 text-muted-foreground">/</span>
                            <span className="text-muted-foreground">Styleguide</span>
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Buttons - ボタンコンポーネント</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Standard Variants - 標準バリアント</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="brand">Brand</Button>
                    <Button variant="brandOutline">Brand Outline</Button>
                    <Button variant="brandGhost">Brand Ghost</Button>
                    <Button variant="brandLink">Brand Link</Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Size Variants - サイズバリアント</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Icon Buttons - アイコンボタン（左配置優先）</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="brand" className="gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>追加</span>
                    </Button>
                    <Button variant="brandOutline" className="gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <span>編集</span>
                    </Button>
                    <Button variant="brandGhost" className="gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>削除</span>
                    </Button>
                    <Button variant="brand" size="sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ルール：アイコン+テキストの場合、アイコンを左に配置（例外：矢印系アイコンでフローを示す場合のみ右配置可）
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lucide Icons - Lucideアイコン利用ルール</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">基本ルール</h4>
                  <div className="rounded-lg bg-muted p-4 text-sm">
                    <ul className="space-y-1">
                      <li>• <strong>アイコンライブラリ</strong>: Lucide React を統一使用</li>
                      <li>• <strong>配置</strong>: アイコン+テキストは左配置（矢印系は右配置可）</li>
                      <li>• <strong>間隔</strong>: <code className="bg-background px-1 py-0.5 rounded text-xs">gap-2</code> (8px) を使用</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">サイズ</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                      <Plus className="w-4 h-4 text-brand-600" />
                      <span className="text-xs">w-4 h-4</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                      <Edit className="w-5 h-5 text-brand-600" />
                      <span className="text-xs">w-5 h-5</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                      <Settings className="w-6 h-6 text-brand-600" />
                      <span className="text-xs">w-6 h-6</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">よく使うアイコン</h4>
                  <div className="grid grid-cols-8 gap-2">
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
                      <Plus className="w-4 h-4 text-brand-600" />
                      <span className="text-xs">Plus</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
                      <Edit className="w-4 h-4 text-brand-600" />
                      <span className="text-xs">Edit</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
                      <Trash2 className="w-4 h-4 text-brand-600" />
                      <span className="text-xs">Trash2</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
                      <Search className="w-4 h-4 text-brand-600" />
                      <span className="text-xs">Search</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
                      <Check className="w-4 h-4 text-brand-600" />
                      <span className="text-xs">Check</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
                      <X className="w-4 h-4 text-brand-600" />
                      <span className="text-xs">X</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
                      <ChevronLeft className="w-4 h-4 text-brand-600" />
                      <span className="text-xs">Left</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
                      <ChevronRight className="w-4 h-4 text-brand-600" />
                      <span className="text-xs">Right</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">色指定</h4>
                  <div className="rounded-lg bg-muted p-3 grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4 text-brand-600" />
                      <code className="text-xs">text-brand-600</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4 text-brand-600" />
                      <code className="text-xs">text-brand-600</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-600" />
                      <code className="text-xs">text-brand-600</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-brand-600" />
                      <code className="text-xs">text-brand-600</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges - バッジコンポーネント</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Standard Variants - 標準バリアント</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="brand">Brand</Badge>
                    <Badge variant="brandSecondary">Brand Secondary</Badge>
                    <Badge variant="brandOutline">Brand Outline</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Elements - フォーム要素</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Standard Inputs - 標準入力</h4>
                  <div className="grid max-w-md grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label variant="brand" htmlFor="brand-email">メールアドレス</Label>
                      <Input id="brand-email" variant="brand" placeholder="example@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label variant="brand" htmlFor="brand-password">パスワード</Label>
                      <Input id="brand-password" variant="brand" type="password" placeholder="パスワードを入力" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Brandバリアント: 企業のブランドカラー（青系）を使用した特別なデザイン
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Form Elements - 追加フォーム要素</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Textarea - テキストエリア</h4>
                  <div className="grid max-w-md grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label variant="brand" htmlFor="brand-textarea">お問い合わせ内容</Label>
                      <Textarea id="brand-textarea" variant="brand" placeholder="お問い合わせ内容を詳しく入力してください..." />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Select - セレクト</h4>
                  <div className="grid max-w-md grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label variant="brand" htmlFor="brand-select">お問い合わせ種別</Label>
                      <Select>
                        <SelectTrigger variant="brand" className="w-full">
                          <SelectValue placeholder="種別を選択してください" />
                        </SelectTrigger>
                        <SelectContent variant="brand">
                          <SelectItem variant="brand" value="general">一般的なお問い合わせ</SelectItem>
                          <SelectItem variant="brand" value="technical">技術的な質問</SelectItem>
                          <SelectItem variant="brand" value="business">ビジネスに関する質問</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Checkbox - チェックボックス</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox variant="brand" id="brand-checkbox" />
                      <Label variant="brand" htmlFor="brand-checkbox">ニュースレター配信を希望する</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox variant="brand" size="sm" id="brand-checkbox-sm" />
                      <Label variant="brand" size="sm" htmlFor="brand-checkbox-sm">Small</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox variant="brand" size="lg" id="brand-checkbox-lg" />
                      <Label variant="brand" htmlFor="brand-checkbox-lg">Large</Label>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Brandバリアント: 企業のブランドカラー（青系）を使用した特別なデザイン
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Display - データ表示</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Table - テーブル</h4>
                  <Table variant="brand">
                    <TableHeader variant="brand">
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>名前</TableHead>
                        <TableHead>役職</TableHead>
                        <TableHead className="text-right">評価</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">001</TableCell>
                        <TableCell>田中太郎</TableCell>
                        <TableCell>エンジニア</TableCell>
                        <TableCell className="text-right">A</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">002</TableCell>
                        <TableCell>佐藤花子</TableCell>
                        <TableCell>デザイナー</TableCell>
                        <TableCell className="text-right">A+</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">003</TableCell>
                        <TableCell>山田次郎</TableCell>
                        <TableCell>プロダクトマネージャー</TableCell>
                        <TableCell className="text-right">B+</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Advanced Data Table - 高機能データテーブル</h4>
                  <DataTable
                    columns={sampleColumns}
                    data={sampleData}
                    searchKey="name"
                    searchPlaceholder="プロジェクト名で検索..."
                    variant="brand"
                    showColumnVisibility={true}
                    showPagination={true}
                  />
                  <p className="text-xs text-muted-foreground">
                    機能: ✅ ソート ✅ 検索フィルター ✅ 列表示切り替え ✅ 行選択 ✅ ページネーション (TanStack Table)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tabs - タブコンポーネント</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Standard Tabs - 標準タブ</h4>
                  <Tabs defaultValue="brand-overview" className="w-full">
                    <TabsList variant="brand">
                      <TabsTrigger variant="brand" value="brand-overview">Overview</TabsTrigger>
                      <TabsTrigger variant="brand" value="brand-analytics">Analytics</TabsTrigger>
                      <TabsTrigger variant="brand" value="brand-settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="brand-overview" className="space-y-4">
                      <Card variant="brand">
                        <CardContent>
                          <p>
                            Brand-themed tab content with brand colors.
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="brand-analytics">
                      <Card variant="brand">
                        <CardContent>
                          <p>Analytics data and charts would go here.</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="brand-settings">
                      <Card variant="brand">
                        <CardContent>
                          <p>Configuration options and preferences.</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Separators - セパレーター</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Standard Separators - 標準セパレーター</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm">水平セパレーター</p>
                      <div className="">
                        <Separator size="sm" variant="default" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeletons - スケルトン</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Standard Skeletons - 標準スケルトン</h4>
                  <div className="space-y-2">
                    <Skeleton variant="brand" className="h-4 w-[250px]" />
                    <Skeleton variant="brand" className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Complex Skeletons - 複合スケルトン</h4>
                  <div className="flex items-center space-x-4">
                    <Skeleton variant="brand" className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton variant="brand" className="h-4 w-[250px]" />
                      <Skeleton variant="brand" className="h-4 w-[200px]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dialogs - ダイアログ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Standard Dialog - 標準ダイアログ</h4>
                  <div className="flex flex-wrap gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="brand">ダイアログを開く</Button>
                      </DialogTrigger>
                      <DialogContent variant="brand">
                        <DialogHeader>
                          <DialogTitle>確認ダイアログ</DialogTitle>
                          <DialogDescription>
                            これはブランドカラーを使用したダイアログです。企業のブランドアイデンティティを表現します。
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="brandOutline">キャンセル</Button>
                          <Button variant="brand">保存</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Brandバリアント: 企業のブランドカラー（青系）を使用した特別なデザイン
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spacing Scale - スペーシングスケール</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  4pxベースのスペーシングスケール - Shopify Polaris風の一貫したレイアウト
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[
                    { size: '1', value: '0.25rem (4px)' },
                    { size: '2', value: '0.5rem (8px)' },
                    { size: '3', value: '0.75rem (12px)' },
                    { size: '4', value: '1rem (16px)' },
                    { size: '5', value: '1.25rem (20px)' },
                    { size: '6', value: '1.5rem (24px)' },
                    { size: '8', value: '2rem (32px)' },
                    { size: '10', value: '2.5rem (40px)' },
                    { size: '16', value: '4rem (64px)' },
                  ].map((item) => (
                    <div key={item.size} className="flex items-center gap-4">
                      <div className="text-muted-foreground w-20 font-mono text-sm">
                        p-{item.size}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {item.value}
                      </div>
                      <div
                        className={`bg-accent rounded-lg p-${item.size} text-xs`}
                      >
                        box
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Brand Colors - ブランドカラー（プリミティブ）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  プリミティブカラーとして定義されたブランドカラーパレット。shadcn/ui標準色と組み合わせて使用する、プロジェクト固有の色です。
                </p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                  {[
                    { name: '50', class: 'bg-brand-50' },
                    { name: '100', class: 'bg-brand-100' },
                    { name: '200', class: 'bg-brand-200' },
                    { name: '300', class: 'bg-brand-300' },
                    { name: '400', class: 'bg-brand-400' },
                    { name: '500', class: 'bg-brand-500' },
                    { name: '600', class: 'bg-brand-600' },
                    { name: '700', class: 'bg-brand-700' },
                    { name: '800', class: 'bg-brand-800' },
                    { name: '900', class: 'bg-brand-900' },
                  ].map((color) => (
                    <div key={color.name} className="space-y-2">
                      <div className={`h-16 rounded-lg ${color.class}`} />
                      <div className="text-center">
                        <div className="text-sm font-medium">Brand {color.name}</div>
                        <div className="text-xs text-muted-foreground">{color.class}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Semantic Colors - セマンティックカラー</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  用途別に定義されたセマンティックカラー。各カラーは特定の機能や状態を表現し、一貫したユーザーエクスペリエンスを提供します。
                </p>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Action Colors - アクションカラー</h4>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {[
                        { name: 'Primary Action', usage: 'プライマリーアクション', bgClass: 'bg-brand-600', textClass: 'text-white' },
                        { name: 'Secondary Action', usage: 'セカンダリーアクション', bgClass: 'bg-brand-100', textClass: 'text-brand-900' },
                        { name: 'Accent Action', usage: 'アクセントアクション', bgClass: 'bg-brand-400', textClass: 'text-white' },
                        { name: 'Disabled Action', usage: '無効アクション', bgClass: 'bg-brand-50', textClass: 'text-brand-700' },
                      ].map((color) => (
                        <div key={color.name} className="space-y-2">
                          <div 
                            className={`h-16 rounded-lg flex items-center justify-center ${color.bgClass}`}
                          >
                            <span className={`text-sm font-medium ${color.textClass}`}>{color.name}</span>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">{color.name}</div>
                            <div className="text-xs text-muted-foreground">{color.usage}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Status Colors - 状態カラー</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                      {[
                        { name: 'Success', usage: '成功、完了、承認状態', bgClass: 'bg-green-500', textClass: 'text-white', textUsage: 'text-success' },
                        { name: 'Warning', usage: '警告、注意が必要な状態', bgClass: 'bg-yellow-500', textClass: 'text-black', textUsage: 'text-warning' },
                        { name: 'Error', usage: 'エラー、削除、危険なアクション', bgClass: 'bg-red-500', textClass: 'text-white', textUsage: 'text-destructive' },
                        { name: 'Info', usage: '情報、進行中状態', bgClass: 'bg-blue-500', textClass: 'text-white', textUsage: 'text-info' },
                      ].map((color) => (
                        <div key={color.name} className="space-y-2">
                          <div 
                            className={`h-16 rounded-lg flex items-center justify-center ${color.bgClass}`}
                          >
                            <span className={`text-sm font-medium ${color.textClass}`}>{color.name}</span>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">{color.name}</div>
                            <div className="text-xs text-muted-foreground">{color.usage}</div>
                            <div className="text-xs text-muted-foreground font-mono">{color.textUsage}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Background Colors - 背景カラー</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {[
                        { name: 'Primary Background', usage: 'プライマリー背景', bgClass: 'bg-brand-50', textClass: 'text-brand-900' },
                        { name: 'Secondary Background', usage: 'セカンダリー背景', bgClass: 'bg-brand-100', textClass: 'text-brand-900' },
                      ].map((color) => (
                        <div key={color.name} className="space-y-2">
                          <div 
                            className={`h-16 rounded-lg flex items-center justify-center ${color.bgClass}`}
                          >
                            <span className={`text-sm font-medium ${color.textClass}`}>{color.name}</span>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">{color.name}</div>
                            <div className="text-xs text-muted-foreground">{color.usage}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Border Colors - 境界線カラー</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {[
                        { name: 'Primary Border', usage: 'プライマリー境界線', bgClass: 'bg-brand-200', textClass: 'text-brand-900' },
                        { name: 'Input Background', usage: '入力フィールド背景', bgClass: 'bg-brand-100', textClass: 'text-brand-900' },
                        { name: 'Focus Ring', usage: 'フォーカスリング', bgClass: 'bg-brand-500', textClass: 'text-white' },
                      ].map((color) => (
                        <div key={color.name} className="space-y-2">
                          <div 
                            className={`h-16 rounded-lg flex items-center justify-center ${color.bgClass}`}
                          >
                            <span className={`text-sm font-medium ${color.textClass}`}>{color.name}</span>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">{color.name}</div>
                            <div className="text-xs text-muted-foreground">{color.usage}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Text Colors - テキストカラー</h4>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h5 className="text-sm font-medium">Text Colors - テキストカラー</h5>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                          {[
                            { name: 'Primary Text', usage: 'メインテキスト', bgClass: 'bg-brand-700', textClass: 'text-white', textUsage: 'text-primary' },
                            { name: 'Muted Text', usage: 'ミュートテキスト', bgClass: 'bg-brand-600', textClass: 'text-white', textUsage: 'text-muted' },
                            { name: 'Caption Text', usage: 'キャプションテキスト', bgClass: 'bg-brand-500', textClass: 'text-white', textUsage: 'text-caption' },
                          ].map((color) => (
                            <div key={color.name} className="space-y-2">
                              <div 
                                className={`h-16 rounded-lg flex items-center justify-center ${color.bgClass}`}
                              >
                                <span className={`text-sm font-medium ${color.textClass}`}>{color.name}</span>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-medium">{color.name}</div>
                                <div className="text-xs text-muted-foreground">{color.usage}</div>
                                <div className="text-xs text-muted-foreground font-mono">{color.textUsage}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-sm font-medium">Interactive Text Colors - インタラクティブテキストカラー</h5>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                          {[
                            { name: 'Primary Link', usage: 'プライマリーリンク', bgClass: 'bg-brand-600', textClass: 'text-white', textUsage: 'text-link' },
                            { name: 'Primary Hover', usage: 'プライマリーホバー', bgClass: 'bg-brand-700', textClass: 'text-white', textUsage: 'text-link-hover' },
                            { name: 'Primary Disabled', usage: 'プライマリー無効', bgClass: 'bg-brand-200', textClass: 'text-brand-400', textUsage: 'text-disabled' },
                          ].map((color) => (
                            <div key={color.name} className="space-y-2">
                              <div 
                                className={`h-16 rounded-lg flex items-center justify-center ${color.bgClass}`}
                              >
                                <span className={`text-sm font-medium ${color.textClass}`}>{color.name}</span>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-medium">{color.name}</div>
                                <div className="text-xs text-muted-foreground">{color.usage}</div>
                                <div className="text-xs text-muted-foreground font-mono">{color.textUsage}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cards - カードコンポーネント</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">間隔ルール - Spacing Rules</h4>
                  <div className="rounded-lg bg-muted p-4 text-sm">
                    <ul className="space-y-2">
                      <li>• <strong>カード全体の間隔</strong>: <code className="bg-background px-2 py-1 rounded">gap-3</code> (12px) - HeaderとContentの間隔</li>
                      <li>• <strong>Header内の間隔</strong>: <code className="bg-background px-2 py-1 rounded">gap-2</code> (8px) - TitleとDescriptionの間隔</li>
                      <li>• <strong>フォント階層</strong>: Title <code className="bg-background px-2 py-1 rounded">text-base font-semibold</code> (16px) &gt; Description <code className="bg-background px-2 py-1 rounded">text-sm</code> (14px)</li>
                      <li>• <strong>余白</strong>: <code className="bg-background px-2 py-1 rounded">p-5</code> (20px) - 統一された内部余白</li>
                      <li>• <strong>マージンリセット</strong>: タイトルと説明文には <code className="bg-background px-2 py-1 rounded">!m-0</code> を適用</li>
                      <li>• <strong>カスタムパディング禁止</strong>: CardContent/CardHeaderに <code className="bg-background px-2 py-1 rounded">p-*</code> <code className="bg-background px-2 py-1 rounded">pt-*</code> <code className="bg-background px-2 py-1 rounded">pb-*</code> を指定しない</li>
                      <li>• <strong>構造の統一</strong>: 1つのカードに複数の <code className="bg-background px-2 py-1 rounded">CardContent</code> を使用しない</li>
                      <li>• <strong>表示順序</strong>: アイコン → CardTitle → CardDescription の順で配置</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Standard Cards - 標準カード</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card variant="brand">
                      <CardHeader>
                        <CardTitle>Brand Card</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>This card uses the brand color variant with subtle brand styling.</p>
                      </CardContent>
                    </Card>
                    <Card variant="brandAccent">
                      <CardHeader>
                        <CardTitle>Brand Accent Card</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>This card uses the brand accent variant with more prominent brand colors.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>



                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">実装例 - Implementation Example</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-success">✅ 正しい例</p>
                      <Card variant="brand" className="scale-90">
                        <CardContent className="text-center">
                          <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-lg">🎯</span>
                          </div>
                        </CardContent>
                        <CardHeader className="text-center">
                          <CardTitle size="sm">正しいカード</CardTitle>
                          <CardDescription>アイコン → タイトル → 説明の順序</CardDescription>
                        </CardHeader>
                      </Card>
                      <code className="text-xs bg-background px-2 py-1 rounded block">
                        {'<CardContent>アイコン</CardContent>\n<CardHeader>タイトル・説明</CardHeader>'}
                      </code>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-destructive">❌ 間違った例</p>
                      <Card variant="outline" className="scale-90 opacity-50">
                        <CardContent className="pt-6 pb-2">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-lg">❌</span>
                          </div>
                        </CardContent>
                        <CardHeader className="pt-0">
                          <CardTitle size="sm">間違ったカード</CardTitle>
                          <CardDescription>カスタムパディングで間隔が崩れる</CardDescription>
                        </CardHeader>
                      </Card>
                      <code className="text-xs bg-background px-2 py-1 rounded block text-destructive">
                        {'<CardContent className="pt-6 pb-2">\n<CardHeader className="pt-0">'}
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typography Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  階層構造を明確にするフォントサイズスケール
                </p>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">Heading 1 - text-2xl (24px)</h1>
                  <h2 className="text-xl font-semibold">Heading 2 - text-xl (20px)</h2>
                  <h3 className="text-lg font-medium">Heading 3 - text-lg (18px)</h3>
                  <h4 className="text-base font-semibold">Card Title - text-base (16px)</h4>
                  <p className="text-base">
                    Regular paragraph text - text-base (16px)
                  </p>
                  <p className="text-brand-500 text-sm">
                    Card Description / Small text - text-sm (14px)
                  </p>
                  <p className="text-brand-400 text-xs">
                    Extra small text / Caption - text-xs (12px)
                  </p>
                </div>
                                  
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Layout Patterns - レイアウトパターン</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">VC Compass Layout - サイドバー + メインコンテンツ</h4>
                  <div className="rounded-lg bg-muted p-4 text-sm">
                    <ul className="space-y-2">
                      <li>• <strong>基本構造</strong>: <code className="bg-background px-2 py-1 rounded">h-[calc(100vh-3.5rem)] flex</code> - ヘッダーを除いた全画面高</li>
                      <li>• <strong>サイドバー</strong>: <code className="bg-background px-2 py-1 rounded">w-64 bg-background border-r flex flex-col divide-y</code> - 固定幅256px、縦分割</li>
                      <li>• <strong>メインエリア</strong>: <code className="bg-background px-2 py-1 rounded">flex-1 py-8 px-6</code> - 残り幅、上下左右余白</li>
                      <li>• <strong>コンテンツ幅制限</strong>: <code className="bg-background px-2 py-1 rounded">max-w-[1000px] mx-auto</code> - 最大1000px、中央配置</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">サイドバー構造 - Sidebar Structure</h4>
                  <div className="rounded-lg bg-muted p-4 text-sm">
                    <ul className="space-y-2">
                      <li>• <strong>セクション区切り</strong>: <code className="bg-background px-2 py-1 rounded">py-4</code> - 上下20px余白</li>
                      <li>• <strong>セクションタイトル</strong>: <code className="bg-background px-2 py-1 rounded">px-6 text-sm font-medium text-muted-foreground mb-4</code></li>
                      <li>• <strong>ナビゲーション項目</strong>: <code className="bg-background px-2 py-1 rounded">w-full px-6 py-2 text-sm cursor-pointer hover:bg-muted rounded transition-colors text-left</code></li>
                      <li>• <strong>アイコン + テキスト</strong>: <code className="bg-background px-2 py-1 rounded">flex items-center gap-2</code> - アイコン左配置、8px間隔</li>
                      <li>• <strong>履歴セクション</strong>: <code className="bg-background px-2 py-1 rounded">flex-1</code> - 残り高さを占有</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">カードグリッドレイアウト - Card Grid Layout</h4>
                  <div className="rounded-lg bg-muted p-4 text-sm">
                    <ul className="space-y-2">
                      <li>• <strong>グリッド構造</strong>: <code className="bg-background px-2 py-1 rounded">grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5</code></li>
                      <li>• <strong>レスポンシブ</strong>: 2列(モバイル) → 3列(タブレット) → 4列(デスクトップ)</li>
                      <li>• <strong>カード間隔</strong>: <code className="bg-background px-2 py-1 rounded">gap-5</code> (20px)</li>
                      <li>• <strong>カードスタイル</strong>: <code className="bg-background px-2 py-1 rounded">rounded-xl border py-5 shadow-sm bg-brand-50/50 border-brand-100</code></li>
                      <li>• <strong>ホバー効果</strong>: <code className="bg-background px-2 py-1 rounded">hover:shadow-lg hover:scale-105 transition-all duration-200</code></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">プロトタイプレイアウトコンポーネント - Prototype Layout Components</h4>
                  <div className="rounded-lg bg-muted p-4 text-sm">
                    <ul className="space-y-2">
                      <li>• <strong>PrototypeLayout</strong>: メインレイアウトコンテナ（サイドバー + メインコンテンツ）</li>
                      <li>• <strong>SidebarSection</strong>: サイドバー内のセクション区切り</li>
                      <li>• <strong>SidebarItemWithIcon</strong>: アイコン付きサイドバー項目</li>
                      <li>• <strong>CardGrid</strong>: レスポンシブカードグリッド</li>
                      <li>• <strong>PrototypeCard</strong>: プロトタイプ用カードコンポーネント</li>
                      <li>• <strong>PrototypeIcon</strong>: カード内のアイコン表示</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">実装例 - Implementation Example</h4>
                  <div className="border rounded-lg p-4 bg-background">
                    <div className="h-64 flex border rounded-lg overflow-hidden">
                      <PrototypeLayout
                        title="スキルライブラリ"
                        description="カテゴリーを選択してください"
                        sidebar={
                          <>
                            <SidebarSection title="スキルライブラリ">
                              <div className="space-y-1">
                                <SidebarItemWithIcon icon="🎯" label="経営戦略" />
                                <SidebarItemWithIcon icon="💰" label="資金調達" />
                              </div>
                            </SidebarSection>
                            <SidebarSection title="履歴" className="flex-1">
                              <div className="space-y-1">
                                <SidebarItem>
                                  <span className="text-muted-foreground">投資家開拓</span>
                                </SidebarItem>
                                <SidebarItem>
                                  <span className="text-muted-foreground">ピッチデック</span>
                                </SidebarItem>
                              </div>
                            </SidebarSection>
                          </>
                        }
                      >
                        {/* メインコンテンツはタイトルとテキストのみ */}
                      </PrototypeLayout>
                    </div>
                  </div>
                </div>


                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">使用ルール - Usage Rules</h4>
                  <div className="rounded-lg bg-muted p-4 text-sm">
                    <ul className="space-y-2">
                      <li>• <strong>高さ計算</strong>: ヘッダー高さ(3.5rem)を除いた全画面高を使用</li>
                      <li>• <strong>サイドバー幅</strong>: 固定256px (w-64) で統一</li>
                      <li>• <strong>コンテンツ幅</strong>: 最大1000pxで制限し、中央配置</li>
                      <li>• <strong>レスポンシブ</strong>: グリッドは画面サイズに応じて2-4列で調整</li>
                      <li>• <strong>ホバー効果</strong>: カードは軽い拡大(scale-105)とシャドウ強化</li>
                      <li>• <strong>アイコン配置</strong>: 左配置、8px間隔(gap-2)で統一</li>
                      <li>• <strong>セクション区切り</strong>: divide-yで縦方向に分割</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">プロトタイプレイアウト使用ルール - Prototype Layout Usage Rules</h4>
                  <div className="rounded-lg bg-muted p-4 text-sm">
                    <ul className="space-y-2">
                      <li>• <strong>PrototypeLayout</strong>: プロトタイプページの基本レイアウトとして使用</li>
                      <li>• <strong>SidebarSection</strong>: サイドバー内で論理的なセクション分けに使用</li>
                      <li>• <strong>SidebarItemWithIcon</strong>: ナビゲーション項目にアイコンが必要な場合に使用</li>
                      <li>• <strong>CardGrid</strong>: カードの一覧表示に使用、レスポンシブ対応</li>
                      <li>• <strong>PrototypeCard</strong>: プロトタイプ専用のカードスタイル、ブランドカラー使用</li>
                      <li>• <strong>PrototypeIcon</strong>: カード内のアイコン表示、ホバー効果付き</li>
                      <li>• <strong>Props設定</strong>: maxWidth、columns、gap等を適切に設定</li>
                      <li>• <strong>一貫性</strong>: 同じレイアウトパターンは必ずコンポーネントを使用</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
