import { ModeToggle } from '@/components/shared/theme-toggle';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-background/60 supports-[backdrop-filter]:bg-background/50 sticky top-0 z-40 border-b backdrop-blur w-full">
      <div className="w-full flex items-center justify-between py-4 px-4 md:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight">
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
      </div>
    </header>
  );
}
