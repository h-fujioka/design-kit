import PageShell from '@/components/page-shell';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Home() {
  return (
    <>
      <Header />
      <PageShell>
        <section className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Clean Starter
            </h1>
            <p className="text-muted-foreground">
              Next.js + Tailwind + shadcn/ui + lucide + framer-motion
            </p>
          </div>

          <Card className="card-soft">
            <CardHeader>
              <CardTitle>Component Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Buttons */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              {/* Badges */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Badges</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>

              {/* Form Elements */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Form Elements</h3>
                <div className="grid max-w-md grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Tabs</h3>
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Shopify-inspired spacing scale for consistent layouts
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  { size: '4', value: '1rem' },
                  { size: '6', value: '1.5rem' },
                  { size: '8', value: '2rem' },
                  { size: '10', value: '2.5rem' },
                  { size: '12', value: '3rem' },
                  { size: '13', value: '3.25rem' },
                  { size: '15', value: '3.75rem' },
                  { size: '18', value: '4.5rem' },
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
              <CardTitle>Typography Scale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">Heading 1</h1>
                <h2 className="text-3xl font-semibold">Heading 2</h2>
                <h3 className="text-2xl font-medium">Heading 3</h3>
                <h4 className="text-xl font-medium">Heading 4</h4>
                <p className="text-base">
                  Regular paragraph text with proper line height and spacing.
                </p>
                <p className="text-muted-foreground text-sm">
                  Small text for secondary information.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
