"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Send } from "lucide-react";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(2, "Add a subject"),
  message: z.string().min(10, "Tell us a little more"),
});
type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [done, setDone] = React.useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    await fetch("/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values),
    }).catch(() => {});
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-[2rem] border border-ink/8 bg-white p-10 text-center shadow-luxe">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-light/15"><Check className="h-8 w-8 text-emerald" /></div>
        <h3 className="mt-5 font-display text-2xl text-ink">Message Sent</h3>
        <p className="mt-2 text-ink/60">Thank you for reaching out. We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-[2rem] border border-ink/8 bg-white p-7 shadow-luxe sm:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Name</Label><Input placeholder="Your name" {...register("name")} />{errors.name && <p className="mt-1 text-xs text-clay">{errors.name.message}</p>}</div>
        <div><Label>Email</Label><Input type="email" placeholder="your@email.com" {...register("email")} />{errors.email && <p className="mt-1 text-xs text-clay">{errors.email.message}</p>}</div>
        <div className="sm:col-span-2"><Label>Subject</Label><Input placeholder="How can we help?" {...register("subject")} />{errors.subject && <p className="mt-1 text-xs text-clay">{errors.subject.message}</p>}</div>
        <div className="sm:col-span-2"><Label>Message</Label><Textarea placeholder="Your message..." {...register("message")} />{errors.message && <p className="mt-1 text-xs text-clay">{errors.message.message}</p>}</div>
      </div>
      <Button type="submit" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
        <Send className="h-5 w-5" /> {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
