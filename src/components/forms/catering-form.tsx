"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, PartyPopper } from "lucide-react";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const eventTypes = ["Corporate Event", "Wedding", "Birthday Party", "Family Gathering", "Community Event"];

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Valid phone required"),
  eventType: z.string().min(1, "Select an event type"),
  eventDate: z.string().min(1, "Select a date"),
  guestCount: z.number().min(10, "Minimum 10 guests"),
  details: z.string().optional(),
});
type Values = z.infer<typeof schema>;

export function CateringForm() {
  const [done, setDone] = React.useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema), defaultValues: { guestCount: 25 },
  });

  async function onSubmit(values: Values) {
    await fetch("/api/catering", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values),
    }).catch(() => {});
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-[2rem] border border-ink/8 bg-white p-10 text-center shadow-luxe">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-light/15"><Check className="h-8 w-8 text-emerald" /></div>
        <h3 className="mt-5 font-display text-2xl text-ink">Request Received</h3>
        <p className="mt-2 text-ink/60">Our catering team will reach out within 24 hours with a custom quote for your event.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-[2rem] border border-ink/8 bg-white p-7 shadow-luxe sm:p-9">
      <h3 className="flex items-center gap-2 font-display text-2xl text-ink"><PartyPopper className="h-6 w-6 text-gold-dark" /> Request a Quote</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}><Input placeholder="Your name" {...register("name")} /></Field>
        <Field label="Phone" error={errors.phone?.message}><Input placeholder="(313) 555-0000" {...register("phone")} /></Field>
        <Field label="Email" error={errors.email?.message} full><Input type="email" placeholder="your@email.com" {...register("email")} /></Field>
        <Field label="Event type" error={errors.eventType?.message}>
          <select className="h-12 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm outline-none focus:border-gold" {...register("eventType")}>
            <option value="">Choose type</option>
            {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Guest count" error={errors.guestCount?.message}><Input type="number" min={10} {...register("guestCount", { valueAsNumber: true })} /></Field>
        <Field label="Event date" error={errors.eventDate?.message} full><Input type="date" {...register("eventDate")} /></Field>
        <Field label="Tell us about your event" full><Textarea placeholder="Menu preferences, venue, budget, dietary needs..." {...register("details")} /></Field>
      </div>
      <Button type="submit" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Request Catering Quote"}
      </Button>
    </form>
  );
}

function Field({ label, error, children, full }: { label: string; error?: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label>{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-clay">{error}</p>}
    </div>
  );
}
