"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, CalendarCheck } from "lucide-react";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { locations } from "@/lib/mock/data";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Valid phone required"),
  location: z.string().min(1, "Select a location"),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  partySize: z.number().min(1).max(50),
  specialRequest: z.string().optional(),
});
type Values = z.infer<typeof schema>;

export function ReservationForm() {
  const [done, setDone] = React.useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { partySize: 2 },
  });

  async function onSubmit(values: Values) {
    await fetch("/api/reservations", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values),
    }).catch(() => {});
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-[2rem] border border-ink/8 bg-white p-10 text-center shadow-luxe">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-light/15"><Check className="h-8 w-8 text-emerald" /></div>
        <h3 className="mt-5 font-display text-2xl text-ink">Reservation Requested</h3>
        <p className="mt-2 text-ink/60">We&apos;ll confirm your table by email and text shortly. We can&apos;t wait to host you!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-[2rem] border border-ink/8 bg-white p-7 shadow-luxe sm:p-9">
      <h3 className="flex items-center gap-2 font-display text-2xl text-ink"><CalendarCheck className="h-6 w-6 text-gold-dark" /> Book Your Table</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}><Input placeholder="Your name" {...register("name")} /></Field>
        <Field label="Phone" error={errors.phone?.message}><Input placeholder="(313) 555-0000" {...register("phone")} /></Field>
        <Field label="Email" error={errors.email?.message} full><Input type="email" placeholder="your@email.com" {...register("email")} /></Field>
        <Field label="Location" error={errors.location?.message}>
          <select className="h-12 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm outline-none focus:border-gold" {...register("location")}>
            <option value="">Choose location</option>
            {locations.map((l) => <option key={l.id} value={l.slug}>{l.name}</option>)}
          </select>
        </Field>
        <Field label="Guests" error={errors.partySize?.message}>
          <select className="h-12 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm outline-none focus:border-gold" {...register("partySize", { valueAsNumber: true })}>
            {Array.from({ length: 12 }).map((_, i) => <option key={i} value={i + 1}>{i + 1} {i === 0 ? "guest" : "guests"}</option>)}
          </select>
        </Field>
        <Field label="Date" error={errors.date?.message}><Input type="date" {...register("date")} /></Field>
        <Field label="Time" error={errors.time?.message}><Input type="time" {...register("time")} /></Field>
        <Field label="Special requests" full><Textarea placeholder="High chair, allergies, celebration..." {...register("specialRequest")} /></Field>
      </div>
      <Button type="submit" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Request Reservation"}
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
