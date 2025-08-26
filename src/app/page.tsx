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
              Design Kit Prototypes
            </h1>
            <p className="text-muted-foreground">
              Explore our design system through various prototype applications
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-2xl">
            <Card variant="brand">
              <CardHeader>
                <CardTitle>Styleguide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Comprehensive design system showcase with all components and variants.
                </p>
                <Button variant="brand" asChild>
                  <Link href="/styleguide">
                    View Styleguide
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border bg-muted/50 p-6">
            <h3 className="text-lg font-semibold mb-2">About This Design System</h3>
            <p className="text-muted-foreground mb-4">
              Built with Next.js 15+, Tailwind CSS v4, and shadcn/ui components. 
              Features a Shopify Polaris-inspired design with 4px grid spacing and 
              Apple-style color palette using OKLCH color space.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-700/10">
                Next.js 15+
              </span>
              <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-700/10">
                Tailwind CSS v4
              </span>
              <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-700/10">
                shadcn/ui
              </span>
              <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-700/10">
                Shopify Polaris
              </span>
              <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-700/10">
                OKLCH Colors
              </span>
            </div>
          </div>
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
