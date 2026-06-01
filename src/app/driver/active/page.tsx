import { DeliveryBoard } from "@/components/driver/delivery-board";

export default function ActiveDeliveriesPage() {
  return (
    <div>
      <p className="mb-4 text-ink/60">Update each delivery&apos;s status as you progress: Assigned → Picked Up → On The Way → Delivered.</p>
      <DeliveryBoard />
    </div>
  );
}
