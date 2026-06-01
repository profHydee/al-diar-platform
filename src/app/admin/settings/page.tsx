import { Store, CreditCard, Share2, Search } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { site } from "@/lib/site";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <Panel title="Restaurant Profile">
        <div className="mb-4 flex items-center gap-2 text-gold-dark"><Store className="h-5 w-5" /><span className="text-sm font-medium">General information</span></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label>Restaurant name</Label><Input defaultValue={site.legalName} /></div>
          <div><Label>Phone</Label><Input defaultValue={site.phone} /></div>
          <div className="sm:col-span-2"><Label>Address</Label><Input defaultValue={site.address} /></div>
          <div className="sm:col-span-2"><Label>Tagline</Label><Input defaultValue={site.tagline} /></div>
        </div>
        <Button className="mt-5">Save Profile</Button>
      </Panel>

      <Panel title="Clover Payment Settings">
        <div className="mb-4 flex items-center gap-2 text-gold-dark"><CreditCard className="h-5 w-5" /><span className="text-sm font-medium">Gateway credentials (sandbox)</span></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label>Merchant ID</Label><Input defaultValue="demo-merchant-id" /></div>
          <div><Label>App ID</Label><Input defaultValue="demo-clover-app-id" /></div>
          <div className="sm:col-span-2"><Label>Access Token</Label><Input type="password" defaultValue="demo-access-token" /></div>
          <div><Label>Environment</Label><select className="h-12 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm outline-none focus:border-gold"><option>Sandbox</option><option>Production</option></select></div>
        </div>
        <Button variant="emerald" className="mt-5">Update Clover Settings</Button>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Social Links">
          <div className="mb-4 flex items-center gap-2 text-gold-dark"><Share2 className="h-5 w-5" /></div>
          <div className="space-y-3">
            <div><Label>Instagram</Label><Input defaultValue={site.social.instagram} /></div>
            <div><Label>Facebook</Label><Input defaultValue={site.social.facebook} /></div>
            <div><Label>TikTok</Label><Input defaultValue={site.social.tiktok} /></div>
          </div>
          <Button className="mt-5">Save Links</Button>
        </Panel>

        <Panel title="SEO Settings">
          <div className="mb-4 flex items-center gap-2 text-gold-dark"><Search className="h-5 w-5" /></div>
          <div className="space-y-3">
            <div><Label>Meta title</Label><Input defaultValue={`${site.name} — ${site.tagline}`} /></div>
            <div><Label>Meta description</Label><Textarea defaultValue={site.description} /></div>
          </div>
          <Button className="mt-5">Save SEO</Button>
        </Panel>
      </div>
    </div>
  );
}
