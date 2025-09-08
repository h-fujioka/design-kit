import { ModeToggle } from '@/components/shared/theme-toggle';

export function PrototypeHeader() {
  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur w-full">
      <div className="w-full flex items-center justify-between py-3 px-4 md:px-6 lg:px-8">
        <span className="text-xl font-semibold text-foreground">
          Prototype
        </span>
        
        <nav className="flex items-center gap-4">
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
