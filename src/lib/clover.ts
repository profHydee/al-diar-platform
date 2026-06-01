/**
 * Clover Payment Gateway integration layer (placeholder / sandbox).
 *
 * This module encapsulates the Clover REST + Ecommerce API surface the
 * platform depends on. In production, wire the fetch calls below to the
 * Clover sandbox/production hosts using the env credentials. For the demo
 * build the network calls are short-circuited with deterministic mock
 * responses so the full checkout flow is exercisable without live keys.
 */

const CLOVER_HOSTS = {
  sandbox: "https://sandbox.dev.clover.com",
  production: "https://api.clover.com",
} as const;

export function cloverConfig() {
  const env = (process.env.CLOVER_ENVIRONMENT ?? "sandbox") as keyof typeof CLOVER_HOSTS;
  return {
    appId: process.env.CLOVER_APP_ID ?? "",
    appSecret: process.env.CLOVER_APP_SECRET ?? "",
    merchantId: process.env.CLOVER_MERCHANT_ID ?? "",
    accessToken: process.env.CLOVER_ACCESS_TOKEN ?? "",
    host: CLOVER_HOSTS[env] ?? CLOVER_HOSTS.sandbox,
    // Treat obvious placeholders as "demo mode".
    isDemo: (process.env.CLOVER_ACCESS_TOKEN ?? "").startsWith("demo"),
  };
}

export interface CloverChargeInput {
  amountCents: number;
  currency?: string;
  source: string; // tokenized card from Clover Elements/iframe
  orderNumber: string;
  email?: string;
}

export interface CloverCharge {
  id: string;
  status: "paid" | "failed" | "pending";
  amountCents: number;
  receiptUrl: string;
  createdAt: string;
}

/** Create a charge against Clover. Falls back to a mock when in demo mode. */
export async function createCharge(input: CloverChargeInput): Promise<CloverCharge> {
  const cfg = cloverConfig();

  if (cfg.isDemo) {
    return {
      id: `demo_chg_${Math.random().toString(36).slice(2, 12)}`,
      status: "paid",
      amountCents: input.amountCents,
      receiptUrl: `https://sandbox.dev.clover.com/receipt/${input.orderNumber}`,
      createdAt: new Date().toISOString(),
    };
  }

  const res = await fetch(`${cfg.host}/v1/charges`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amountCents,
      currency: input.currency ?? "usd",
      source: input.source,
      metadata: { orderNumber: input.orderNumber, email: input.email },
    }),
  });

  if (!res.ok) {
    throw new Error(`Clover charge failed: ${res.status}`);
  }

  const data = await res.json();
  return {
    id: data.id,
    status: data.paid ? "paid" : "pending",
    amountCents: data.amount,
    receiptUrl: data.receipt ?? "",
    createdAt: new Date(data.created * 1000).toISOString(),
  };
}

/** Retrieve a charge status (for payment status tracking). */
export async function getCharge(chargeId: string): Promise<CloverCharge> {
  const cfg = cloverConfig();
  if (cfg.isDemo || chargeId.startsWith("demo_")) {
    return {
      id: chargeId,
      status: "paid",
      amountCents: 0,
      receiptUrl: "",
      createdAt: new Date().toISOString(),
    };
  }
  const res = await fetch(`${cfg.host}/v1/charges/${chargeId}`, {
    headers: { Authorization: `Bearer ${cfg.accessToken}` },
  });
  const data = await res.json();
  return {
    id: data.id,
    status: data.paid ? "paid" : "pending",
    amountCents: data.amount,
    receiptUrl: data.receipt ?? "",
    createdAt: new Date(data.created * 1000).toISOString(),
  };
}
