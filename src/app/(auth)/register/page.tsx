"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Min 6 characters"),
});
type Values = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) }).catch(() => {});
    router.push("/dashboard");
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Create your account</h1>
      <p className="mt-1 text-ink/55">Join the Al-Diar family</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div><Label>Full name</Label><Input placeholder="Your name" {...register("name")} />{errors.name && <p className="mt-1 text-xs text-clay">{errors.name.message}</p>}</div>
        <div><Label>Email</Label><Input type="email" placeholder="you@example.com" {...register("email")} />{errors.email && <p className="mt-1 text-xs text-clay">{errors.email.message}</p>}</div>
        <div><Label>Password</Label><Input type="password" placeholder="••••••••" {...register("password")} />{errors.password && <p className="mt-1 text-xs text-clay">{errors.password.message}</p>}</div>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create Account"}</Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/55">
        Already have an account? <Link href="/login" className="font-medium text-emerald-deep hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
