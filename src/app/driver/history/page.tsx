import { Panel, StatusBadge } from "@/components/dashboard/widgets";
import { formatCurrency } from "@/lib/utils";

const history = [
  { id: "AD-48201", customer: "Aisha Noor", date: "2026-05-29", total: 86.0, tip: 12, area: "Dearborn" },
  { id: "AD-48196", customer: "Tom Bradley", date: "2026-05-29", total: 39.5, tip: 6, area: "Dearborn" },
  { id: "AD-48190", customer: "Maria Lopez", date: "2026-05-28", total: 54.0, tip: 8, area: "Hamtramck" },
  { id: "AD-48184", customer: "Sam Patel", date: "2026-05-28", total: 28.5, tip: 5, area: "Dearborn" },
  { id: "AD-48177", customer: "Grace Kim", date: "2026-05-27", total: 102.0, tip: 18, area: "Sterling Heights" },
];

export default function DriverHistoryPage() {
  return (
    <Panel title="Delivery History">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-ink/50">
              <th className="pb-3 font-medium">Order</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Area</th>
              <th className="pb-3 text-right font-medium">Total</th>
              <th className="pb-3 text-right font-medium">Tip</th>
              <th className="pb-3 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h.id} className="border-b border-ink/5">
                <td className="py-3 font-medium text-ink">#{h.id}</td>
                <td className="py-3 text-ink/70">{h.customer}</td>
                <td className="py-3 text-ink/60">{h.date}</td>
                <td className="py-3 text-ink/60">{h.area}</td>
                <td className="py-3 text-right text-ink/80">{formatCurrency(h.total)}</td>
                <td className="py-3 text-right text-emerald">{formatCurrency(h.tip)}</td>
                <td className="py-3 text-right"><StatusBadge status="Delivered" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
