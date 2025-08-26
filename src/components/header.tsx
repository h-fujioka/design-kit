import Link from 'next/link';
import { Container } from '@/components/container';
import { ModeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="bg-background/60 supports-[backdrop-filter]:bg-background/50 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="font-medium tracking-tight">
          Design Kit
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            href="/styleguide" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Styleguide
          </Link>
          <ModeToggle />
        </nav>
      </Container>
    </header>
  );
}
