import { DashboardShell, type NavItem } from "@/components/dashboard/shell";

const nav: NavItem[] = [
  { label: "Dashboard", href: "/driver", icon: "LayoutDashboard" },
  { label: "Active Deliveries", href: "/driver/active", icon: "Navigation" },
  { label: "History", href: "/driver/history", icon: "History" },
  { label: "Earnings", href: "/driver/earnings", icon: "DollarSign" },
];

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell nav={nav} title="Driver Hub" role="Driver" user={{ name: "Yusuf Mansour", email: "yusuf@aldiar.com" }}>
      {children}
    </DashboardShell>
  );
}
