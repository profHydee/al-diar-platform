import { Mail, Users, Ticket, ImagePlus, Plus, Send } from "lucide-react";
import { StatCard, Panel } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { promotions } from "@/lib/mock/data";

const campaigns = [
  { name: "Ramadan Feast Launch", sent: 5820, open: "42%", status: "Sent" },
  { name: "Weekend Family Deal", sent: 4210, open: "38%", status: "Sent" },
  { name: "Gold Tier Upgrade", sent: 0, open: "—", status: "Draft" },
];

export default function AdminMarketingPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-4">
        <StatCard label="Subscribers" value="8,420" delta="+212 this month" icon="Mail" accent="gold" />
        <StatCard label="Avg. Open Rate" value="40%" icon="MailOpen" accent="emerald" />
        <StatCard label="Active Coupons" value="6" icon="Ticket" accent="clay" />
        <StatCard label="Campaigns Sent" value="34" icon="Send" accent="ink" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Email Campaigns" action={<Button size="sm"><Plus className="h-4 w-4" /> New Campaign</Button>}>
          <div className="space-y-3">
            {campaigns.map((c) => (
              <div key={c.name} className="flex items-center justify-between rounded-2xl border border-ink/8 p-4">
                <div>
                  <p className="font-medium text-ink">{c.name}</p>
                  <p className="text-xs text-ink/50">{c.sent.toLocaleString()} sent · {c.open} open</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.status === "Sent" ? "bg-emerald-light/20 text-emerald" : "bg-ink/10 text-ink/60"}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Coupon Generator">
          <div className="space-y-3">
            <Input placeholder="Coupon code (e.g. SUMMER20)" />
            <div className="grid grid-cols-2 gap-3">
              <select className="h-12 rounded-xl border border-ink/15 bg-white px-3 text-sm outline-none focus:border-gold"><option>Percent off</option><option>Fixed amount</option></select>
              <Input placeholder="Value" type="number" />
            </div>
            <Input placeholder="Usage limit" type="number" />
            <Button className="w-full"><Ticket className="h-4 w-4" /> Generate Coupon</Button>
          </div>
        </Panel>
      </div>

      <Panel title="Promotional Banners" action={<Button size="sm"><ImagePlus className="h-4 w-4" /> New Banner</Button>}>
        <div className="grid gap-4 sm:grid-cols-2">
          {promotions.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-2xl border border-ink/8 p-4">
              <div>
                <p className="font-medium text-ink">{p.title}</p>
                <p className="text-xs text-ink/50">Code {p.code} · {p.discount}</p>
              </div>
              <span className="rounded-full bg-emerald-light/20 px-2.5 py-1 text-xs font-semibold text-emerald">Live</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
