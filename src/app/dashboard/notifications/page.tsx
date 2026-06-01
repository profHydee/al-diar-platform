import { Truck, Award, Tag, Megaphone } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { notifications } from "@/lib/mock/dashboard";
import { cn } from "@/lib/utils";

const iconFor = { ORDER_UPDATE: Truck, REWARD: Award, PROMOTION: Tag, ANNOUNCEMENT: Megaphone } as const;

export default function NotificationsPage() {
  return (
    <Panel title="Notifications">
      <div className="space-y-2">
        {notifications.map((n, i) => {
          const Icon = iconFor[n.type as keyof typeof iconFor] ?? Megaphone;
          return (
            <div key={i} className={cn("flex gap-4 rounded-2xl border p-4", n.read ? "border-ink/8 bg-white" : "border-gold/30 bg-gold/5")}>
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-deep/8 text-emerald-deep"><Icon className="h-5 w-5" /></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-ink">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-gold" />}
                </div>
                <p className="text-sm text-ink/60">{n.body}</p>
                <p className="mt-1 text-xs text-ink/40">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
