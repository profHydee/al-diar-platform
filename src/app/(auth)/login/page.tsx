"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

const schema = z.object({ email: z.string().email("Valid email required"), password: z.string().min(6, "Min 6 characters") });
type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    // Demo: in production this calls signIn("credentials", ...). Routes to dashboard.
    setError("");
    await new Promise((r) => setTimeout(r, 500));
    void values;
    router.push("/dashboard");
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Welcome back</h1>
      <p className="mt-1 text-ink/55">Sign in to your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div><Label>Email</Label><Input type="email" placeholder="you@example.com" {...register("email")} />{errors.email && <p className="mt-1 text-xs text-clay">{errors.email.message}</p>}</div>
        <div>
          <div className="flex justify-between"><Label>Password</Label><Link href="#" className="text-xs text-gold-dark hover:underline">Forgot?</Link></div>
          <Input type="password" placeholder="••••••••" {...register("password")} />{errors.password && <p className="mt-1 text-xs text-clay">{errors.password.message}</p>}
        </div>
        {error && <p className="text-sm text-clay">{error}</p>}
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Signing in..." : "Sign In"}</Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/55">
        New here? <Link href="/register" className="font-medium text-emerald-deep hover:underline">Create an account</Link>
      </p>
      <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs text-ink/40">
        <Link href="/dashboard" className="rounded-lg border border-ink/10 py-2 hover:bg-white">Customer</Link>
        <Link href="/driver" className="rounded-lg border border-ink/10 py-2 hover:bg-white">Driver</Link>
        <Link href="/admin" className="rounded-lg border border-ink/10 py-2 hover:bg-white">Admin</Link>
      </div>
      <p className="mt-2 text-center text-[11px] text-ink/35">Demo shortcuts to role dashboards</p>
    </div>
  );
}
