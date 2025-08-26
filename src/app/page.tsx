import { PageShell } from '@/components/page-shell';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Header />
      <PageShell>
        <section className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Welcome to Design Kit
            </h1>
            <p className="text-muted-foreground">
              A Shopify Polaris-inspired design system with 4px grid spacing
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Design System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Explore our comprehensive design system featuring Shopify Polaris-inspired components, 
                  4px grid spacing, and Apple-style color palette.
                </p>
                <Button asChild>
                  <Link href="/styleguide">
                    View Styleguide
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
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
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
