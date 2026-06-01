/**
 * Database seed — run with: npx tsx prisma/seed.ts
 * Populates locations, categories, menu items, an admin, a driver and a demo customer.
 * The public site renders from src/lib/mock until you point it at these records.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email: "admin@aldiar.com" },
    update: {},
    create: { email: "admin@aldiar.com", name: "Khaled Al-Diar", passwordHash, role: "ADMIN", adminProfile: { create: { title: "Owner" } } },
  });

  await prisma.user.upsert({
    where: { email: "driver@aldiar.com" },
    update: {},
    create: { email: "driver@aldiar.com", name: "Yusuf Mansour", passwordHash, role: "DRIVER", driverProfile: { create: { vehicle: "Toyota Prius", licensePlate: "ALD-1284" } } },
  });

  await prisma.user.upsert({
    where: { email: "layla@example.com" },
    update: {},
    create: { email: "layla@example.com", name: "Layla Hassan", passwordHash, role: "CUSTOMER", customerProfile: { create: { loyaltyTier: "GOLD", pointsBalance: 1240 } } },
  });

  await prisma.restaurantLocation.upsert({
    where: { slug: "dearborn" },
    update: {},
    create: {
      name: "Al-Diar Dearborn", slug: "dearborn", address: "5421 Schaefer Rd", city: "Dearborn",
      state: "MI", zip: "48126", phone: "(313) 555-0142", lat: 42.322, lng: -83.176,
      services: ["Dine-in", "Delivery", "Pickup", "Catering"],
    },
  });

  const category = await prisma.menuCategory.upsert({
    where: { slug: "signature-mandi" },
    update: {},
    create: { name: "Signature Mandi", slug: "signature-mandi", description: "Slow-smoked rice & meat" },
  });

  await prisma.menuItem.upsert({
    where: { slug: "lamb-mandi" },
    update: {},
    create: {
      categoryId: category.id, name: "Royal Lamb Mandi", slug: "lamb-mandi",
      description: "Tender lamb slow-smoked over aromatic wood on saffron basmati.",
      price: 28.5, isPopular: true, isChefPick: true, dietaryTags: ["Halal", "Gluten-Free"],
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
