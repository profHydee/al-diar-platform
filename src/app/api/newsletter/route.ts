import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: { isActive: true },
      create: { email: parsed.data.email },
    });
  } catch {
    // Demo mode: DB not connected — accept silently.
  }
  return NextResponse.json({ ok: true });
}
