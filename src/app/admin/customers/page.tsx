import { StatCard, Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { customers } from "@/lib/mock/dashboard";
import { formatCurrency } from "@/lib/utils";

const tierVariant: Record<string, "gold" | "emerald" | "clay" | "ink"> = {
  Platinum: "emerald", Gold: "gold", Silver: "ink", Bronze: "clay",
};

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-4">
        <StatCard label="Total Customers" value="6,210" delta="+89 this week" icon="Users" accent="emerald" />
        <StatCard label="Repeat Rate" value="76%" delta="+3% MoM" icon="Repeat" accent="gold" />
        <StatCard label="Avg. LTV" value="$684" icon="TrendingUp" accent="clay" />
        <StatCard label="Loyalty Members" value="4,120" icon="Award" accent="ink" />
      </div>

      <Panel title="Customer Directory">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-ink/50">
                <th className="pb-3 font-medium">Customer</th><th className="pb-3 font-medium">Tier</th>
                <th className="pb-3 text-right font-medium">Orders</th><th className="pb-3 text-right font-medium">Spent</th>
                <th className="pb-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.email} className="border-b border-ink/5">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-deep font-display text-cream">{c.name.charAt(0)}</span>
                      <div><p className="font-medium text-ink">{c.name}</p><p className="text-xs text-ink/45">{c.email}</p></div>
                    </div>
                  </td>
                  <td className="py-3"><Badge variant={tierVariant[c.tier]}>{c.tier}</Badge></td>
                  <td className="py-3 text-right text-ink/80">{c.orders}</td>
                  <td className="py-3 text-right text-ink/80">{formatCurrency(c.spent)}</td>
                  <td className="py-3 text-ink/60">{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
