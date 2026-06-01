import { StatCard } from "@/components/dashboard/widgets";
import { DeliveryBoard } from "@/components/driver/delivery-board";

export default function DriverDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Deliveries" value="3" icon="Navigation" accent="clay" />
        <StatCard label="Completed Today" value="14" delta="+4 vs yesterday" icon="CircleCheck" accent="emerald" />
        <StatCard label="Today's Earnings" value="$182" icon="DollarSign" accent="gold" />
        <StatCard label="Rating" value="4.9" delta="Top 5% of drivers" icon="Star" accent="ink" />
      </div>

      <div>
        <h2 className="mb-3 font-display text-xl text-ink">Assigned & Active Orders</h2>
        <DeliveryBoard />
      </div>
    </div>
  );
}
