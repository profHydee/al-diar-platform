import { StatCard, Panel } from "@/components/dashboard/widgets";
import { RevenueChart, OrdersBarChart, PopularDishesChart, RetentionLineChart, MiniLegend } from "@/components/dashboard/charts";
import { revenueData, ordersData, popularDishes, retentionData } from "@/lib/mock/dashboard";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Conversion Rate" value="6.4%" delta="+0.8% vs last month" icon="MousePointerClick" accent="gold" />
        <StatCard label="Avg. Order Value" value="$56.30" delta="+$3.10" icon="Receipt" accent="emerald" />
        <StatCard label="Customer Retention" value="76%" delta="+5% YoY" icon="HeartHandshake" accent="clay" />
        <StatCard label="Monthly Traffic" value="48.2K" delta="+11%" icon="Activity" accent="ink" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Revenue"><RevenueChart data={revenueData} /></Panel>
        <Panel title="Sales by Day"><OrdersBarChart data={ordersData} /></Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Customer Retention" className="lg:col-span-2"><RetentionLineChart data={retentionData} /></Panel>
        <Panel title="Popular Dishes">
          <PopularDishesChart data={popularDishes} />
          <div className="mt-4"><MiniLegend items={popularDishes} /></div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { label: "Traffic Sources", rows: [["Organic Search", 42], ["Direct", 28], ["Social", 18], ["Referral", 12]] },
          { label: "Top Locations", rows: [["Dearborn", 48], ["Hamtramck", 31], ["Sterling Heights", 21]] },
          { label: "Device Split", rows: [["Mobile", 64], ["Desktop", 29], ["Tablet", 7]] },
        ].map((card) => (
          <Panel key={card.label} title={card.label}>
            <div className="space-y-3">
              {card.rows.map(([name, pct]) => (
                <div key={name as string}>
                  <div className="flex justify-between text-sm text-ink/70"><span>{name}</span><span className="font-medium text-ink">{pct}%</span></div>
                  <div className="mt-1 h-2 rounded-full bg-ink/8"><div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} /></div>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
