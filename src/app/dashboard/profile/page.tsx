import { MapPin, Plus, Trash2, Lock } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

const addresses = [
  { label: "Home", line: "5421 Schaefer Rd, Dearborn, MI 48126", default: true },
  { label: "Work", line: "1 Campus Martius, Detroit, MI 48226", default: false },
];

export default function ProfilePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel title="Profile Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label>First name</Label><Input defaultValue="Layla" /></div>
          <div><Label>Last name</Label><Input defaultValue="Hassan" /></div>
          <div className="sm:col-span-2"><Label>Email</Label><Input type="email" defaultValue="layla@example.com" /></div>
          <div className="sm:col-span-2"><Label>Phone</Label><Input defaultValue="(313) 555-0142" /></div>
          <div className="sm:col-span-2"><Label>Birthday</Label><Input type="date" defaultValue="1992-06-14" /></div>
        </div>
        <Button className="mt-5">Save Changes</Button>
      </Panel>

      <div className="space-y-6">
        <Panel title="Change Password">
          <div className="space-y-4">
            <div><Label>Current password</Label><Input type="password" placeholder="••••••••" /></div>
            <div><Label>New password</Label><Input type="password" placeholder="••••••••" /></div>
            <div><Label>Confirm new password</Label><Input type="password" placeholder="••••••••" /></div>
          </div>
          <Button variant="red" className="mt-5"><Lock className="h-4 w-4" /> Update Password</Button>
        </Panel>

        <Panel title="Saved Addresses" action={<Button size="sm" variant="outline"><Plus className="h-4 w-4" /> Add</Button>}>
          <div className="space-y-3">
            {addresses.map((a) => (
              <div key={a.label} className="flex items-start justify-between rounded-2xl border border-ink/8 p-4">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-gold-dark" />
                  <div>
                    <p className="flex items-center gap-2 font-medium text-ink">{a.label} {a.default && <span className="rounded-full bg-emerald-deep/10 px-2 py-0.5 text-[11px] text-emerald-deep">Default</span>}</p>
                    <p className="text-sm text-ink/55">{a.line}</p>
                  </div>
                </div>
                <button className="text-ink/40 hover:text-clay"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
