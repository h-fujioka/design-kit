import { Container } from '@/components/container';

export default function PageShell({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
