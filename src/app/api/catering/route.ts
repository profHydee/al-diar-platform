import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  eventType: z.string(),
  eventDate: z.string(),
  guestCount: z.number().min(1),
  details: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  try {
    await prisma.cateringRequest.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        eventType: parsed.data.eventType,
        eventDate: new Date(parsed.data.eventDate),
        guestCount: parsed.data.guestCount,
        details: parsed.data.details,
      },
    });
  } catch {
    // Demo mode — accept silently.
  }
  return NextResponse.json({ ok: true });
}
