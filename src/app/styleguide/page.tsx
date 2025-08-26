import { PageShell } from '@/components/shared/page-shell';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
                        <CardContent className="p-6">
                          <p>
                            Brand-themed tab content with brand colors.
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="brand-analytics">
                      <Card variant="brand">
                        <CardContent className="p-6">
                          <p>Analytics data and charts would go here.</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="brand-settings">
                      <Card variant="brand">
                        <CardContent className="p-6">
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
                <CardTitle>Layout Examples - レイアウト例</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Shopify Polaris風のレイアウトコンポーネント - 管理画面用
                </p>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Admin Layout - 管理画面レイアウト</h4>
                    <div className="text-sm text-muted-foreground mb-2">
                      検索バー付きヘッダー + コンテナ付きメインコンテンツ
                    </div>
                    <div className="bg-muted rounded p-2 text-xs">
                      <code>AdminLayout</code> - 完全な管理画面レイアウト
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">List Page Shell - リストページシェル</h4>
                    <div className="text-sm text-muted-foreground mb-2">
                      KPIカード + ツールバーとページネーション付きテーブル
                    </div>
                    <div className="bg-muted rounded p-2 text-xs">
                      <code>ListPageShell</code> - テーブルベースのリストページ
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Edit Page Shell - 編集ページシェル</h4>
                    <div className="text-sm text-muted-foreground mb-2">
                      メインコンテンツ + 設定用サイドバー（360px）
                    </div>
                    <div className="bg-muted rounded p-2 text-xs">
                      <code>EditPageShell</code> - フォームベースの編集ページ
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Usage Examples - 使用例</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-muted rounded p-2">
                        <code>polaris-container</code> - レスポンシブパディング付き中央コンテナ
                      </div>
                      <div className="bg-muted rounded p-2">
                        <code>polaris-grid</code> - 24pxギャップ付きグリッド
                      </div>
                      <div className="bg-muted rounded p-2">
                        <code>polaris-spacing-*</code> - 4pxベースのスペーシングユーティリティ
                      </div>
                    </div>
                  </div>
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
