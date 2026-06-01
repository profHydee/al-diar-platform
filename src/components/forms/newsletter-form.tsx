"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

const schema = z.object({ email: z.string().email("Enter a valid email") });
type Values = z.infer<typeof schema>;

export function NewsletterForm() {
  const [done, setDone] = React.useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: Values) {
    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).catch(() => {});
    setDone(true);
  }

  if (done) {
    return (
      <p className="flex items-center gap-2 rounded-xl bg-emerald/20 px-4 py-3 text-sm text-cream">
        <Check className="h-4 w-4 text-gold" /> You&apos;re subscribed. Welcome to the family!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="your@email.com"
          className="border-white/20 bg-white/10 text-cream placeholder:text-cream/40"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-xs text-clay">{errors.email.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold text-ink transition hover:bg-gold-light disabled:opacity-50"
        aria-label="Subscribe"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}
