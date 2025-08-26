import { PageShell } from '@/components/page-shell';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
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

          <Separator />

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="brand">Brand</Button>
                  <Button variant="brandOutline">Brand Outline</Button>
                  <Button variant="brandGhost">Brand Ghost</Button>
                  <Button variant="brandLink">Brand Link</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="brand">Brand</Badge>
                  <Badge variant="brandSecondary">Brand Secondary</Badge>
                  <Badge variant="brandOutline">Brand Outline</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid max-w-md grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                </div>
                <div className="grid max-w-md grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label variant="brand" htmlFor="brand-email">Brand Email</Label>
                    <Input id="brand-email" variant="brand" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label variant="required" htmlFor="required-field">Required Field</Label>
                    <Input id="required-field" variant="error" placeholder="This field is required" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <Card>
                      <CardContent className="p-6">
                        <p>
                          Overview tab content with clean layout and proper
                          spacing.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="analytics">
                    <Card>
                      <CardContent className="p-6">
                        <p>Analytics data and charts would go here.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="settings">
                    <Card>
                      <CardContent className="p-6">
                        <p>Configuration options and preferences.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

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
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Separators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p>Default separator</p>
                  <Separator />
                </div>
                <div className="space-y-2">
                  <p>Brand separator</p>
                  <Separator variant="brand" />
                </div>
                <div className="space-y-2">
                  <p>Strong separator</p>
                  <Separator variant="strong" />
                </div>
                <div className="flex items-center space-x-4">
                  <span>Vertical</span>
                  <Separator orientation="vertical" variant="brand" />
                  <span>separator</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeletons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton variant="brand" className="h-4 w-[250px]" />
                  <Skeleton variant="brand" className="h-4 w-[200px]" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dialogs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Default Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Default Dialog</DialogTitle>
                        <DialogDescription>
                          This is a default dialog with standard styling.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="brand">Brand Dialog</Button>
                    </DialogTrigger>
                    <DialogContent variant="brand">
                      <DialogHeader>
                        <DialogTitle>Brand Dialog</DialogTitle>
                        <DialogDescription>
                          This is a brand-themed dialog with brand colors.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button variant="brand">Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shopify Polaris Spacing Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  4px-based spacing scale for consistent Shopify Polaris-style layouts
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
                <CardTitle>Shopify Polaris Layout Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Shopify Polaris-style layout components for admin interfaces
                </p>
                
                {/* Admin Layout Example */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Admin Layout</h4>
                  <div className="text-sm text-muted-foreground mb-2">
                    Header with search bar + Main content with container
                  </div>
                  <div className="bg-muted rounded p-2 text-xs">
                    <code>AdminLayout</code> - Full admin page layout
                  </div>
                </div>

                {/* List Page Shell Example */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">List Page Shell</h4>
                  <div className="text-sm text-muted-foreground mb-2">
                    KPI cards + Table with toolbar and pagination
                  </div>
                  <div className="bg-muted rounded p-2 text-xs">
                    <code>ListPageShell</code> - Table-based list pages
                  </div>
                </div>

                {/* Edit Page Shell Example */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Edit Page Shell</h4>
                  <div className="text-sm text-muted-foreground mb-2">
                    Main content + Sidebar (360px) for settings
                  </div>
                  <div className="bg-muted rounded p-2 text-xs">
                    <code>EditPageShell</code> - Form-based edit pages
                  </div>
                </div>

                {/* Usage Examples */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Usage Examples</h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-muted rounded p-2">
                      <code>polaris-container</code> - Centered container with responsive padding
                    </div>
                    <div className="bg-muted rounded p-2">
                      <code>polaris-grid</code> - Grid with 24px gap
                    </div>
                    <div className="bg-muted rounded p-2">
                      <code>polaris-spacing-*</code> - 4px-based spacing utilities
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Brand Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Apple/Shopify inspired brand color palette using OKLCH color space
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
                <CardTitle>Brand Cards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
