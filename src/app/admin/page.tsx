import Link from "next/link";
import { StatCard, Panel, StatusBadge } from "@/components/dashboard/widgets";
import { RevenueChart, OrdersBarChart, PopularDishesChart, MiniLegend } from "@/components/dashboard/charts";
import { revenueData, ordersData, popularDishes, recentOrders } from "@/lib/mock/dashboard";
import { formatCurrency } from "@/lib/utils";

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Revenue (MTD)" value="$71.2K" delta="+5.8% vs last month" icon="DollarSign" accent="gold" />
        <StatCard label="Orders" value="1,264" delta="+142 this week" icon="ShoppingBag" accent="emerald" />
        <StatCard label="Customers" value="6,210" delta="+89 new" icon="Users" accent="clay" />
        <StatCard label="Avg. Rating" value="4.9" delta="312 reviews" icon="Star" accent="ink" />
        <StatCard label="Deliveries" value="842" delta="98% on time" icon="Truck" accent="emerald" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Revenue Trend" className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </Panel>
        <Panel title="Popular Dishes">
          <PopularDishesChart data={popularDishes} />
          <div className="mt-4"><MiniLegend items={popularDishes} /></div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Orders This Week" className="lg:col-span-2">
          <OrdersBarChart data={ordersData} />
        </Panel>
        <Panel title="Delivery Stats">
          <div className="space-y-4">
            {[
              { label: "On-time rate", value: 98, color: "bg-emerald" },
              { label: "Avg. delivery time", value: 76, color: "bg-gold", caption: "28 min" },
              { label: "Driver utilization", value: 84, color: "bg-clay" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm text-ink/70"><span>{s.label}</span><span className="font-medium text-ink">{s.caption ?? `${s.value}%`}</span></div>
                <div className="mt-1.5 h-2 rounded-full bg-ink/8"><div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.value}%` }} /></div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Recent Orders" action={<Link href="/admin/orders" className="text-sm text-gold-dark hover:underline">Manage all</Link>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-ink/50">
                <th className="pb-3 font-medium">Order</th><th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Items</th><th className="pb-3 text-right font-medium">Total</th>
                <th className="pb-3 font-medium">Driver</th><th className="pb-3 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-ink/5">
                  <td className="py-3 font-medium text-ink">#{o.id}</td>
                  <td className="py-3 text-ink/70">{o.customer}</td>
                  <td className="py-3 text-ink/60">{o.items}</td>
                  <td className="py-3 text-right text-ink/80">{formatCurrency(o.total)}</td>
                  <td className="py-3 text-ink/60">{o.driver}</td>
                  <td className="py-3 text-right"><StatusBadge status={o.stage} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
