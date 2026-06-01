import { IMG, uimg } from "./images";

export type MenuItem = {
  id: string;
  slug: string;
  name: string;
  arabicName?: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  calories?: number;
  prepTime?: number;
  dietaryTags: string[];
  spiceLevel: number;
  isPopular?: boolean;
  isChefPick?: boolean;
  addons?: { group: string; required?: boolean; options: { name: string; price: number }[] }[];
};

export const categories = [
  { id: "c1", slug: "salad", name: "Salads", description: "Perfect salad, the soul of Yemen", icon: "Flame" },
  { id: "c2", slug: "breakfasts", name: "Breakfasts", description: "Delicious morning meals", icon: "Coffee" },
  { id: "c3", slug: "hot-drinks", name: "Hot Drinks", description: "Steaming cups of traditional Yemeni beverages", icon: "CupSoda" },
  { id: "c4", slug: "drinks", name: "Drinks", description: "Fresh tandoor & malooga", icon: "cup" },
  { id: "c5", slug: "desserts", name: "Desserts", description: "Honey, dates & saffron sweets", icon: "Cake" },
  { id: "c6", slug: "honey", name: "Honey", description: "Fresh Honey", icon: "CupSoda" },
];

export const menuItems: MenuItem[] = [
  {
    id: "m1", slug: "lamb-mandi", name: "Royal Lamb Mandi", arabicName: "مندي لحم",
    description: "Tender lamb slow-smoked over aromatic wood, served on saffron basmati with raisins and toasted almonds.",
    price: 28.5, category: "signature-mandi", image: IMG.mandi, rating: 4.9, reviewCount: 342,
    calories: 820, prepTime: 35, dietaryTags: ["Halal", "Gluten-Free"], spiceLevel: 1,
    isPopular: true, isChefPick: true,
    addons: [
      { group: "Portion", required: true, options: [{ name: "Half", price: 0 }, { name: "Full", price: 12 }] },
      { group: "Extras", options: [{ name: "Extra Saltah Sauce", price: 2.5 }, { name: "Grilled Tomato", price: 1.5 }] },
    ],
  },
  {
    id: "m2", slug: "chicken-mandi", name: "Smoked Chicken Mandi", arabicName: "مندي دجاج",
    description: "Char-smoked half chicken over fragrant mandi rice with house spice blend and signature dakkah.",
    price: 21.0, category: "signature-mandi", image: IMG.kabsa, rating: 4.8, reviewCount: 287,
    calories: 740, prepTime: 30, dietaryTags: ["Halal"], spiceLevel: 1, isPopular: true,
  },
  {
    id: "m3", slug: "kabsa", name: "Royal Kabsa", arabicName: "كبسة",
    description: "Spiced long-grain rice layered with slow-braised meat, dried lime and a whisper of cardamom.",
    price: 24.0, category: "signature-mandi", image: IMG.rice, rating: 4.7, reviewCount: 198,
    calories: 780, prepTime: 32, dietaryTags: ["Halal"], spiceLevel: 2,
  },
  {
    id: "m4", slug: "mixed-grill", name: "Al-Diar Mixed Grill", arabicName: "مشاوي مشكل",
    description: "A regal platter of lamb chops, shish tawook, kofta and seasoned wings over charcoal.",
    price: 34.0, category: "grills", image: IMG.grill, rating: 4.9, reviewCount: 256,
    calories: 960, prepTime: 28, dietaryTags: ["Halal"], spiceLevel: 2, isPopular: true, isChefPick: true,
  },
  {
    id: "m5", slug: "lamb-chops", name: "Charcoal Lamb Chops", arabicName: "ريش غنم",
    description: "Marinated New Zealand lamb chops grilled over open flame, finished with sea salt.",
    price: 32.0, category: "grills", image: IMG.lamb, rating: 4.8, reviewCount: 174,
    calories: 690, prepTime: 25, dietaryTags: ["Halal", "Keto"], spiceLevel: 1, isChefPick: true,
  },
  {
    id: "m6", slug: "saltah", name: "Saltah Yemeni Stew", arabicName: "سلتة",
    description: "Yemen's national dish — bubbling stew topped with fenugreek froth, served sizzling.",
    price: 16.5, category: "appetizers", image: IMG.soup, rating: 4.6, reviewCount: 142,
    calories: 410, prepTime: 18, dietaryTags: ["Halal", "Vegetarian-option"], spiceLevel: 2, isPopular: true,
  },
  {
    id: "m7", slug: "fattoush", name: "Garden Fattoush", arabicName: "فتوش",
    description: "Crisp greens, sumac, pomegranate molasses and toasted bread shards.",
    price: 11.0, category: "appetizers", image: IMG.salad, rating: 4.5, reviewCount: 98,
    calories: 220, prepTime: 10, dietaryTags: ["Vegan", "Vegetarian"], spiceLevel: 0,
  },
  {
    id: "m8", slug: "malooga-bread", name: "Stone-Oven Malooga", arabicName: "ملوج",
    description: "Pillowy flame-baked flatbread brushed with nigella seed and clarified butter.",
    price: 5.0, category: "breads", image: IMG.bread, rating: 4.7, reviewCount: 120,
    calories: 260, prepTime: 8, dietaryTags: ["Vegetarian"], spiceLevel: 0,
  },
  {
    id: "m9", slug: "bint-al-sahn", name: "Bint Al-Sahn", arabicName: "بنت الصحن",
    description: "Honeyed layered pastry drizzled with wildflower honey and black seed — a royal treat.",
    price: 9.5, category: "desserts", image: IMG.dessert, rating: 4.9, reviewCount: 211,
    calories: 480, prepTime: 12, dietaryTags: ["Vegetarian"], spiceLevel: 0, isChefPick: true, isPopular: true,
  },
  {
    id: "m10", slug: "honey-dates", name: "Saffron Honey Dates", arabicName: "تمر بالعسل",
    description: "Medjool dates stuffed with mascarpone, saffron honey and crushed pistachio.",
    price: 8.0, category: "desserts", image: IMG.honey, rating: 4.6, reviewCount: 87,
    calories: 320, prepTime: 6, dietaryTags: ["Vegetarian", "Gluten-Free"], spiceLevel: 0,
  },
  {
    id: "m11", slug: "adeni-tea", name: "Adeni Milk Tea", arabicName: "شاي عدني",
    description: "Cardamom-spiced black tea simmered with milk — the taste of Aden mornings.",
    price: 4.5, category: "beverages", image: IMG.tea, rating: 4.8, reviewCount: 156,
    calories: 120, prepTime: 6, dietaryTags: ["Vegetarian"], spiceLevel: 0, isPopular: true,
  },
  {
    id: "m12", slug: "qishr", name: "Qishr Coffee", arabicName: "قشر",
    description: "Traditional Yemeni coffee-husk brew with ginger and cinnamon.",
    price: 5.0, category: "beverages", image: IMG.coffee, rating: 4.7, reviewCount: 102,
    calories: 60, prepTime: 6, dietaryTags: ["Vegan"], spiceLevel: 0,
  },
];

export const locations = [
  {
    id: "l1", slug: "orleans-st", name: "Orleans St.", address: "939 N Orleans St",
    city: "Chicago", state: "IL", zip: "60610", phone: "+1 872-299-3019",
    lat: 42.322, lng: -83.176, rating: 4.9, reviewCount: 1284,
    services: ["Dine-in", "Delivery", "Pickup", "Catering", "Private Events"],
    hours: { "Mon–Sun": "10:00 AM – 9:00 PM"},
    image: IMG.interior2,
  },
  {
    id: "l2", slug: "harlem-ave", name: "Harlem Ave", address: "11015 S Harlem Ave",
    city: "Worth", state: "IL", zip: "60482", phone: "+1 708-308-0692",
    lat: 42.393, lng: -83.056, rating: 4.8, reviewCount: 742,
    services: ["Dine-in", "Delivery", "Pickup", "Catering"],
    hours: { "Mon–Sun": "10:00 AM – 9:00 PM"},
    image: IMG.family,
  },
];

export const testimonials = [
  { id: "t1", author: "Layla Hassan", role: "Food Writer, Detroit Eats", rating: 5, avatar: uimg("1438761681033-6461ffad8d80", 200), body: "The lamb mandi at Al-Diar is the most authentic I've had outside of Sana'a. Every detail, from the smoke to the saffron rice, sings." },
  { id: "t2", author: "Marcus Bennett", role: "Regular Guest", rating: 5, avatar: uimg("1500648767791-00dcc994a43e", 200), body: "I've ordered weekly for a year. The new platform makes reordering effortless and the rewards add up fast. Best Yemeni food in Michigan." },
  { id: "t3", author: "Fatima Al-Rashid", role: "Event Host", rating: 5, avatar: uimg("1534528741775-53994a69daeb", 200), body: "Catered my daughter's engagement for 120 guests. Flawless service, stunning presentation, and every single guest asked where it was from." },
  { id: "t4", author: "David Chen", role: "Local Foodie", rating: 5, avatar: uimg("1507003211169-0a1dd7228f2d", 200), body: "The bint al-sahn dessert alone is worth the drive. This is fine dining hiding as a neighborhood restaurant." },
];

export const blogPosts = [
  { id: "b1", slug: "art-of-mandi", title: "The Ancient Art of Mandi", excerpt: "How a 600-year-old underground smoking technique became Yemen's most beloved dish.", category: "Culture", author: "Chef Khaled Al-Diar", date: "2026-05-12", cover: IMG.mandi, readTime: 6 },
  { id: "b2", slug: "yemeni-coffee-origins", title: "Yemen: The Birthplace of Coffee", excerpt: "Long before lattes, the port of Mocha gave the world its first cup. We trace the journey.", category: "Heritage", author: "Amina Saleh", date: "2026-04-28", cover: IMG.coffee, readTime: 5 },
  { id: "b3", slug: "spice-route", title: "Along the Ancient Spice Route", excerpt: "Cardamom, fenugreek and black lime — the aromatic backbone of every Al-Diar plate.", category: "Ingredients", author: "Chef Khaled Al-Diar", date: "2026-04-10", cover: IMG.spices, readTime: 7 },
  { id: "b4", slug: "ramadan-feasts", title: "Crafting the Perfect Ramadan Feast", excerpt: "Our chefs share how to build a table that honors tradition and gathers family.", category: "Recipes", author: "Amina Saleh", date: "2026-03-18", cover: IMG.platter, readTime: 8 },
];

export const events = [
  { id: "e1", title: "Yemeni Heritage Night", date: "2026-06-14", time: "7:00 PM", location: "Dearborn", description: "Live oud, a 7-course tasting menu and storytelling from the old quarter of Sana'a.", image: IMG.heroInterior },
  { id: "e2", title: "Coffee & Qishr Tasting", date: "2026-06-21", time: "5:00 PM", location: "Hamtramck", description: "A guided journey through Yemen's coffee heritage with our master roaster.", image: IMG.coffee },
  { id: "e3", title: "Family Grill Festival", date: "2026-07-04", time: "1:00 PM", location: "Sterling Heights", description: "Open-fire mashawi, kids' activities and complimentary Adeni tea all afternoon.", image: IMG.grill },
];

export const promotions = [
  { id: "p1", title: "Family Feast Friday", description: "Lamb Mandi for 4 + dessert & drinks", discount: "25% OFF", code: "FAMILY25", endsAt: addDays(2), image: IMG.platter },
  { id: "p2", title: "First Order Welcome", description: "New guests save on their very first order", discount: "$10 OFF", code: "WELCOME10", endsAt: addDays(9), image: IMG.mandi },
];

export const stats = [
  { label: "Orders Served", value: 248000, suffix: "+" },
  { label: "Happy Guests", value: 62000, suffix: "+" },
  { label: "Years of Heritage", value: 18, suffix: "" },
  { label: "Locations", value: 3, suffix: "" },
  { label: "Average Rating", value: 4.9, suffix: "/5", decimals: 1 },
];

export const faqs = [
  { q: "What are your delivery hours?", a: "Delivery runs daily from 11:00 AM until 30 minutes before each location closes. You can schedule orders in advance from the ordering page." },
  { q: "Is all your meat halal?", a: "Yes. 100% of our meat is certified halal, sourced from trusted local suppliers and prepared fresh daily." },
  { q: "Do you cater large events?", a: "Absolutely. We cater weddings, corporate events and family gatherings from 20 to 500+ guests. Visit our Catering page to request a quote." },
  { q: "How does the loyalty program work?", a: "Earn 1 point per $1 spent. Points unlock Bronze, Silver, Gold and Platinum tiers, each with escalating rewards like free desserts, priority reservations and chef's table access." },
  { q: "Can I customize spice levels?", a: "Yes — most dishes can be adjusted. Use the customization options when ordering or note your preference at checkout." },
  { q: "Do you accommodate dietary restrictions?", a: "We offer vegan, vegetarian, gluten-free and keto-friendly options, all clearly tagged across the menu." },
];

export const team = [
  { name: "Khaled Al-Diar", role: "Founder & Executive Chef", image: IMG.chef, bio: "Third-generation Yemeni chef who brought his grandmother's recipes from Sana'a to Michigan in 2008." },
  { name: "Amina Saleh", role: "Head of Hospitality", image: uimg("1573496359142-b8d87734a5a2", 600), bio: "Curates every guest experience, from the first hello to the last cup of Adeni tea." },
  { name: "Yusuf Mansour", role: "Pit Master", image: uimg("1583394838336-acd977736f90", 600), bio: "Guardian of the underground tandoor, smoking mandi to perfection for over a decade." },
];

export const values = [
  { title: "Authentic Heritage", description: "Recipes passed through three generations, unchanged and uncompromised.", icon: "Landmark" },
  { title: "Fresh Daily", description: "Spices ground in-house, bread baked to order, nothing frozen.", icon: "Leaf" },
  { title: "Family First", description: "Every guest is welcomed as family — that's the Yemeni way.", icon: "Heart" },
  { title: "Crafted with Fire", description: "Charcoal grills and underground tandoors, the way it's meant to be.", icon: "Flame" },
];

function addDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

export function getItemBySlug(slug: string) {
  return menuItems.find((m) => m.slug === slug);
}
export function getItemsByCategory(slug: string) {
  return menuItems.filter((m) => m.category === slug);
}
export function popularItems() {
  return menuItems.filter((m) => m.isPopular);
}
export function chefPicks() {
  return menuItems.filter((m) => m.isChefPick);
}
