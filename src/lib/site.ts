// Resolve an absolute site URL. Handles missing OR empty env values, and
// falls back to the Vercel deployment URL so `new URL()` never throws at build.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const site = {
  name: "Al-Diar",
  legalName: "Al-Diar Restaurant USA",
  tagline: "Authentic Yemeni Cuisine, Reimagined",
  description:
    "Al-Diar Digital Experience Platform — premium Yemeni dining, online ordering, reservations, catering, and rewards.",
  phone: "+1 872-299-3019",
  phone2: "+1 708-308-0692",
  email: "hello@aldiar.com",
  address: "939 N Orleans St, Chicago, IL 60610, United States",
  address2: "11015 S Harlem Ave,Worth , IL , 60482",
  location1: "Orleans St: ",
  location2: "Harlem Ave: ",
  url: siteUrl,
  social: {
    instagram: "https://instagram.com/aldiar",
    facebook: "https://facebook.com/aldiar",
    tiktok: "https://tiktok.com/@aldiar",
    youtube: "https://youtube.com/@aldiar",
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Order", href: "/order" },
  { label: "Reservations", href: "/reservations" },
  { label: "Catering", href: "/catering" },
  // { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  // { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const loyaltyTiers = [
  { tier: "Bronze", min: 0, perks: ["Welcome reward", "Birthday treat", "Member pricing"] },
  { tier: "Silver", min: 500, perks: ["Free drink monthly", "Early access to specials", "2x weekend points"] },
  { tier: "Gold", min: 1500, perks: ["Free dessert weekly", "Priority reservations", "Exclusive tastings"] },
  { tier: "Platinum", min: 5000, perks: ["Chef's table access", "Complimentary catering tasting", "Concierge line"] },
] as const;
