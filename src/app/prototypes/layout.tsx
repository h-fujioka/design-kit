import { PrototypeHeader } from '@/components/prototypes/header';

export default function PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PrototypeHeader />
      {children}
    </>
  );
}
