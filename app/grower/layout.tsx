import HeaderDashboard from "@/components/DashboardHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <HeaderDashboard />

      {children}
    </main>
  );
}
