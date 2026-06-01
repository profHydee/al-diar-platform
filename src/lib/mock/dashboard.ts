export const revenueData = [
  { name: "Jan", revenue: 42000 }, { name: "Feb", revenue: 47500 }, { name: "Mar", revenue: 51200 },
  { name: "Apr", revenue: 49800 }, { name: "May", revenue: 58400 }, { name: "Jun", revenue: 63100 },
  { name: "Jul", revenue: 67800 }, { name: "Aug", revenue: 71200 },
];

export const ordersData = [
  { name: "Mon", orders: 124 }, { name: "Tue", orders: 98 }, { name: "Wed", orders: 142 },
  { name: "Thu", orders: 167 }, { name: "Fri", orders: 243 }, { name: "Sat", orders: 289 }, { name: "Sun", orders: 201 },
];

export const popularDishes = [
  { name: "Lamb Mandi", value: 32 }, { name: "Mixed Grill", value: 24 },
  { name: "Chicken Mandi", value: 21 }, { name: "Kabsa", value: 14 }, { name: "Other", value: 9 },
];

export const retentionData = [
  { name: "Jan", rate: 58 }, { name: "Feb", rate: 61 }, { name: "Mar", rate: 64 }, { name: "Apr", rate: 63 },
  { name: "May", rate: 68 }, { name: "Jun", rate: 71 }, { name: "Jul", rate: 73 }, { name: "Aug", rate: 76 },
];

const stages = ["Pending", "Confirmed", "Preparing", "Assigned", "On The Way", "Delivered", "Cancelled"] as const;

export const recentOrders = [
  { id: "AD-48213", customer: "Layla Hassan", items: 3, total: 64.5, stage: "On The Way", driver: "Yusuf M.", time: "12 min ago" },
  { id: "AD-48212", customer: "Marcus Bennett", items: 2, total: 42.0, stage: "Preparing", driver: "—", time: "18 min ago" },
  { id: "AD-48211", customer: "Fatima Al-Rashid", items: 6, total: 128.0, stage: "Confirmed", driver: "—", time: "25 min ago" },
  { id: "AD-48210", customer: "David Chen", items: 1, total: 28.5, stage: "Delivered", driver: "Sara K.", time: "1 hr ago" },
  { id: "AD-48209", customer: "Aisha Noor", items: 4, total: 86.0, stage: "Delivered", driver: "Yusuf M.", time: "2 hr ago" },
  { id: "AD-48208", customer: "Tom Bradley", items: 2, total: 39.5, stage: "Cancelled", driver: "—", time: "3 hr ago" },
];

export const customers = [
  { name: "Layla Hassan", email: "layla@example.com", orders: 42, spent: 1840, tier: "Gold", joined: "2023-04-12" },
  { name: "Marcus Bennett", email: "marcus@example.com", orders: 67, spent: 2910, tier: "Platinum", joined: "2022-11-03" },
  { name: "Fatima Al-Rashid", email: "fatima@example.com", orders: 18, spent: 760, tier: "Silver", joined: "2024-01-22" },
  { name: "David Chen", email: "david@example.com", orders: 9, spent: 312, tier: "Bronze", joined: "2024-08-15" },
  { name: "Aisha Noor", email: "aisha@example.com", orders: 31, spent: 1290, tier: "Gold", joined: "2023-07-30" },
];

export const drivers = [
  { name: "Yusuf Mansour", deliveries: 1284, rating: 4.9, status: "Active", earnings: 4820, area: "Dearborn" },
  { name: "Sara Khalil", deliveries: 942, rating: 4.8, status: "Active", earnings: 3610, area: "Hamtramck" },
  { name: "Omar Said", deliveries: 678, rating: 4.7, status: "Offline", earnings: 2540, area: "Sterling Heights" },
];

export const driverAssignments = [
  { id: "AD-48213", customer: "Layla Hassan", address: "5421 Schaefer Rd, Dearborn", items: 3, total: 64.5, stage: "On The Way", distance: "1.2 mi" },
  { id: "AD-48207", customer: "Hassan Karim", address: "210 Oak St, Dearborn", items: 2, total: 38.0, stage: "Assigned", distance: "2.8 mi" },
  { id: "AD-48205", customer: "Emily Ross", address: "88 Maple Ave, Dearborn", items: 5, total: 104.0, stage: "Assigned", distance: "3.4 mi" },
];

export const customerOrders = [
  { id: "AD-48213", date: "2026-05-29", items: ["Royal Lamb Mandi", "Adeni Tea", "Bint Al-Sahn"], total: 64.5, stage: "On The Way" },
  { id: "AD-47980", date: "2026-05-21", items: ["Mixed Grill", "Fattoush"], total: 45.0, stage: "Delivered" },
  { id: "AD-47712", date: "2026-05-10", items: ["Chicken Mandi", "Qishr Coffee"], total: 26.0, stage: "Delivered" },
  { id: "AD-47455", date: "2026-04-28", items: ["Saltah Yemeni Stew", "Malooga", "Honey Dates"], total: 29.5, stage: "Delivered" },
];

export const rewardHistory = [
  { date: "2026-05-29", reason: "Order AD-48213", points: 64, type: "earned" },
  { date: "2026-05-21", reason: "Redeemed: Free Dessert", points: -200, type: "redeemed" },
  { date: "2026-05-21", reason: "Order AD-47980", points: 45, type: "earned" },
  { date: "2026-05-10", reason: "Birthday Bonus", points: 250, type: "earned" },
  { date: "2026-05-10", reason: "Order AD-47712", points: 26, type: "earned" },
];

export const notifications = [
  { type: "ORDER_UPDATE", title: "Your order is on the way!", body: "Yusuf is 12 minutes away with order #AD-48213.", time: "12 min ago", read: false },
  { type: "REWARD", title: "You reached Gold tier!", body: "Enjoy free desserts weekly and priority reservations.", time: "2 days ago", read: false },
  { type: "PROMOTION", title: "Family Feast Friday", body: "25% off family platters this Friday. Use code FAMILY25.", time: "3 days ago", read: true },
  { type: "ANNOUNCEMENT", title: "New dish alert", body: "Introducing our Saffron Honey Dates — now on the menu.", time: "1 week ago", read: true },
];
