import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  location: z.string(),
  date: z.string(),
  time: z.string(),
  partySize: z.number().min(1),
  specialRequest: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  try {
    const location = await prisma.restaurantLocation.findUnique({ where: { slug: parsed.data.location } });
    if (location) {
      await prisma.reservation.create({
        data: {
          locationId: location.id,
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          date: new Date(parsed.data.date),
          time: parsed.data.time,
          partySize: parsed.data.partySize,
          specialRequest: parsed.data.specialRequest,
        },
      });
    }
  } catch {
    // Demo mode — accept silently.
  }
  return NextResponse.json({ ok: true });
}
