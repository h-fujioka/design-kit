import { Container } from './container';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'constrained' | 'full';
}

export function PageShell({ children, className, maxWidth = 'constrained' }: PageShellProps) {
  const containerClass = maxWidth === 'full' ? 'container-full' : 'container-constrained';
  
  return (
    <div className="min-h-screen">
      <main className="polaris-main">
        <Container className={`${containerClass} ${className || ''}`}>
          <div className="polaris-grid">
            {children}
          </div>
        </Container>
      </main>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="polaris-header">
        <Container className="py-400 md:py-600">
          {/* 検索バー等 */}
        </Container>
      </header>

      <main className="polaris-main">
        <Container>
          <div className="polaris-grid">
            {children}
          </div>
        </Container>
      </main>
    </div>
  );
}

export function ListPageShell({ toolbar, table }: { toolbar: React.ReactNode; table: React.ReactNode }) {
  return (
    <div className="polaris-grid">
      <section className="polaris-grid-cols-3 gap-400">
        {/* KPIカード */}
      </section>
      <section className="polaris-table-container">
        <div className="polaris-table-header">{toolbar}</div>
        <div className="polaris-table-body">{table}</div>
        <div className="polaris-table-footer">
          {/* Pagination */}
        </div>
      </section>
    </div>
  );
}

export function EditPageShell({ main, side }: { main: React.ReactNode; side: React.ReactNode }) {
  return (
    <div className="polaris-grid lg:grid-cols-[1fr_360px]">
      <div className="polaris-grid">{main}</div>
      <aside className="polaris-aside">
        {/* 右カラムのカード群：公開/販売/分類/タグなど */}
        {side}
      </aside>
    </div>
  );
}
