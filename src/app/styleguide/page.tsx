"use client"

import { PageShell } from '@/components/shared/page-shell';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from "@tanstack/react-table";

// Lucide Icons for demonstration
import {
  Plus, Edit, Trash2, Search, Download, Upload, Eye, EyeOff, Settings,
  User, Users, Mail, Phone, MapPin, Calendar, Clock, Star, Heart,
  Home, Building, Car, Plane, Ship, Truck, Bike, Bus,
  Check, X, AlertCircle, Info, HelpCircle, AlertTriangle, Zap,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ArrowLeft, ArrowRight,
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Sun, Moon, Wifi, Battery, Signal, Bluetooth
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
        row.getValue("status") === "完了" ? "text-green-600" :
        row.getValue("status") === "進行中" ? "text-blue-600" : "text-gray-600"
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
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
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
                  Explore our comprehensive design system featuring Shopify Polaris-inspired components, 
                  4px grid spacing, and Apple-style color palette.
                </p>
              </CardContent>
            </Card>

            <Card variant="brandAccent">
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 4px-based spacing system</li>
                  <li>• Shopify Polaris layout components</li>
                  <li>• Apple-inspired color palette</li>
                  <li>• Responsive design patterns</li>
                  <li>• Accessibility-first approach</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="grid gap-6">
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
                      <Trash2 className="w-4 h-4 text-red-500" />
                      <span className="text-xs">Trash2</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
                      <Search className="w-4 h-4 text-brand-600" />
                      <span className="text-xs">Search</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-xs">Check</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
                      <X className="w-4 h-4 text-red-500" />
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
                      <Trash2 className="w-4 h-4 text-red-500" />
                      <code className="text-xs">text-red-500</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <code className="text-xs">text-green-500</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <code className="text-xs">text-yellow-500</code>
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
                      <Label variant="brand" htmlFor="brand-email">Brand Email</Label>
                      <Input id="brand-email" variant="brand" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                      <Label variant="brand" htmlFor="brand-password">Brand Password</Label>
                      <Input id="brand-password" variant="brand" type="password" />
                    </div>
                  </div>
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
                      <Label variant="brand" htmlFor="brand-textarea">Brand Textarea</Label>
                      <Textarea id="brand-textarea" variant="brand" placeholder="メッセージを入力してください..." />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Select - セレクト</h4>
                  <div className="grid max-w-md grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label variant="brand" htmlFor="brand-select">Brand Select</Label>
                      <Select>
                        <SelectTrigger variant="brand" className="w-full">
                          <SelectValue placeholder="オプションを選択" />
                        </SelectTrigger>
                        <SelectContent variant="brand">
                          <SelectItem variant="brand" value="option1">オプション 1</SelectItem>
                          <SelectItem variant="brand" value="option2">オプション 2</SelectItem>
                          <SelectItem variant="brand" value="option3">オプション 3</SelectItem>
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
                      <Label variant="brand" htmlFor="brand-checkbox">Brand Checkbox</Label>
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
                      <p className="text-sm">Brand separator</p>
                      <Separator variant="brand" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">Strong separator</p>
                      <Separator variant="strong" />
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm">Vertical</span>
                      <Separator orientation="vertical" variant="brand" />
                      <span className="text-sm">separator</span>
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
                        <Button variant="brand">Brand Dialog</Button>
                      </DialogTrigger>
                      <DialogContent variant="brand">
                        <DialogHeader>
                          <DialogTitle>Brand Dialog</DialogTitle>
                          <DialogDescription>
                            This is a brand dialog with brand styling.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="brandOutline">Cancel</Button>
                          <Button variant="brand">Save</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
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
                    { size: '100', value: '0.25rem (4px)' },
                    { size: '200', value: '0.5rem (8px)' },
                    { size: '300', value: '0.75rem (12px)' },
                    { size: '400', value: '1rem (16px)' },
                    { size: '600', value: '1.5rem (24px)' },
                    { size: '800', value: '2rem (32px)' },
                    { size: '1000', value: '2.5rem (40px)' },
                    { size: '1600', value: '4rem (64px)' },
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
                <CardTitle>Brand Colors - ブランドカラー</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Apple/Shopify風のブランドカラーパレット - OKLCH色空間を使用
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
                      <div className={`h-16 rounded-lg ${color.class} border`} />
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
                <CardTitle>Cards - カードコンポーネント</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">間隔ルール - Spacing Rules</h4>
                  <div className="rounded-lg bg-muted p-4 text-sm">
                    <ul className="space-y-2">
                      <li>• <strong>カード全体の間隔</strong>: <code className="bg-background px-2 py-1 rounded">gap-3</code> (12px) - HeaderとContentの間隔</li>
                      <li>• <strong>Header内の間隔</strong>: <code className="bg-background px-2 py-1 rounded">gap-2</code> (8px) - TitleとDescriptionの間隔</li>
                      <li>• <strong>余白</strong>: <code className="bg-background px-2 py-1 rounded">px-5 py-5</code> (20px) - 統一された内部余白</li>
                      <li>• <strong>マージンリセット</strong>: タイトルと説明文には <code className="bg-background px-2 py-1 rounded">!m-0</code> を適用</li>
                      <li>• <strong>カスタムパディング禁止</strong>: CardContentに <code className="bg-background px-2 py-1 rounded">p-*</code> を指定しない</li>
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
                      <p className="text-xs font-medium text-green-600">✅ 正しい例</p>
                      <Card variant="brand" className="scale-90">
                        <CardHeader>
                          <CardTitle size="sm">正しいカード</CardTitle>
                          <CardDescription>gap-3とgap-2による統一間隔</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">コンテンツはデフォルト間隔</p>
                        </CardContent>
                      </Card>
                      <code className="text-xs bg-background px-2 py-1 rounded block">
                        {'<CardContent>...</CardContent>'}
                      </code>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-red-600">❌ 間違った例</p>
                      <Card variant="outline" className="scale-90 opacity-50">
                        <CardHeader>
                          <CardTitle size="sm">間違ったカード</CardTitle>
                          <CardDescription>カスタムパディングで間隔が崩れる</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                          <p className="text-sm">p-6で二重余白になる</p>
                        </CardContent>
                      </Card>
                      <code className="text-xs bg-background px-2 py-1 rounded block text-red-600">
                        {'<CardContent className="p-6">'}
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
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">Heading 1</h1>
                  <h2 className="text-2xl font-semibold">Heading 2</h2>
                  <h3 className="text-xl font-medium">Heading 3</h3>
                  <h4 className="text-lg font-medium">Heading 4</h4>
                  <p className="text-base">
                    Regular paragraph text with proper line height and spacing.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Small text for secondary information.
                  </p>
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
