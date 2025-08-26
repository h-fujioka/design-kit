import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { CompassDashboard } from '@/components/prototypes/vc-compass/CompassDashboard';

export default function VCCompassPage() {
  return (
    <>
      <Header />
      <CompassDashboard />
      <Footer />
    </>
  );
}
