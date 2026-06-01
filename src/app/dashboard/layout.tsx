import { DashboardShell, type NavItem } from "@/components/dashboard/shell";

const nav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "My Orders", href: "/dashboard/orders", icon: "Package" },
  { label: "Rewards", href: "/dashboard/rewards", icon: "Award" },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: "Heart" },
  { label: "Reviews", href: "/dashboard/reviews", icon: "Star" },
  { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
  { label: "Profile", href: "/dashboard/profile", icon: "User" },
];

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell nav={nav} title="My Dashboard" role="Member" user={{ name: "Layla Hassan", email: "layla@example.com" }}>
      {children}
    </DashboardShell>
  );
}
