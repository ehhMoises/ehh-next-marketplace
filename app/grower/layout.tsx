import HeaderDashboard from '@/components/DashboardHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grower - Marketplace',
  description: 'Grower Dashboard',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <HeaderDashboard />

      {children}
    </main>
  );
}
