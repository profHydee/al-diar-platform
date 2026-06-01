import { StatCard, Panel } from "@/components/dashboard/widgets";
import { OrdersBarChart } from "@/components/dashboard/charts";

const weekly = [
  { name: "Mon", orders: 142 }, { name: "Tue", orders: 118 }, { name: "Wed", orders: 156 },
  { name: "Thu", orders: 174 }, { name: "Fri", orders: 232 }, { name: "Sat", orders: 268 }, { name: "Sun", orders: 198 },
];

export default function EarningsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="This Week" value="$1,184" delta="+12% vs last week" icon="DollarSign" accent="gold" />
        <StatCard label="This Month" value="$4,820" icon="Wallet" accent="emerald" />
        <StatCard label="Total Tips" value="$612" icon="HandCoins" accent="clay" />
        <StatCard label="Deliveries" value="1,284" icon="Package" accent="ink" />
      </div>

      <Panel title="Earnings by Day (this week, $)">
        <OrdersBarChart data={weekly} />
        <p className="mt-3 text-xs text-ink/40">Earnings figures are placeholders pending payout-provider integration.</p>
      </Panel>
    </div>
  );
}
