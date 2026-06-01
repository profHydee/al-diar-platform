import { DashboardShell, type NavItem } from "@/components/dashboard/shell";

const nav: NavItem[] = [
  { label: "Overview", href: "/admin", icon: "LayoutDashboard" },
  { label: "Menu", href: "/admin/menu", icon: "UtensilsCrossed" },
  { label: "Orders", href: "/admin/orders", icon: "ShoppingBag" },
  { label: "Customers", href: "/admin/customers", icon: "Users" },
  { label: "Drivers", href: "/admin/drivers", icon: "Truck" },
  { label: "Content", href: "/admin/content", icon: "FileText" },
  { label: "Marketing", href: "/admin/marketing", icon: "Megaphone" },
  { label: "Reviews", href: "/admin/reviews", icon: "Star" },
  { label: "Analytics", href: "/admin/analytics", icon: "ChartColumn" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell nav={nav} title="Admin Console" role="Admin" user={{ name: "Khaled Al-Diar", email: "admin@aldiar.com" }}>
      {children}
    </DashboardShell>
  );
}
