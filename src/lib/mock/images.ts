// Centralized image helper. Swap to Cloudinary in production.
const U = "https://images.unsplash.com/photo-";
const P = "?auto=format&fit=crop&q=80";

export function uimg(id: string, w = 1200) {
  return `${U}${id}${P}&w=${w}`;
}

export const IMG = {
  heroDish: uimg("1504674900247-0877df9cc836", 1920),
  heroInterior: uimg("1414235077428-338989a2e8c0", 1920),
  mandi: uimg("1633945274405-b6c8069047b0"),
  lamb: uimg("1546964124-0cce460f38ef"),
  rice: uimg("1596797038530-2c107229654b"),
  grill: uimg("1555939594-58d7cb561ad1"),
  salad: uimg("1546069901-ba9599a7e63c"),
  soup: uimg("1547592180-85f173990554"),
  dessert: uimg("1551024601-bec78aea704b"),
  bread: uimg("1509440159596-0249088772ff"),
  coffee: uimg("1447933601403-0c6688de566e"),
  tea: uimg("1564890369478-c89ca6d9cde9"),
  honey: uimg("1587049352846-4a222e784d38"),
  platter: uimg("1606787366850-de6330128bfc"),
  kabsa: uimg("1559339352-11d035aa65de"),
  interior2: uimg("1517248135467-4c7edcad34c4"),
  chef: uimg("1577219491135-ce391730fb2c"),
  family: uimg("1414235077428-338989a2e8c0"),
  spices: uimg("1596040033229-a9821ebd058d"),
  table: uimg("1559339352-11d035aa65de"),
};

export const GALLERY = [
  uimg("1504674900247-0877df9cc836", 800),
  uimg("1414235077428-338989a2e8c0", 800),
  uimg("1546069901-ba9599a7e63c", 800),
  uimg("1555939594-58d7cb561ad1", 800),
  uimg("1606787366850-de6330128bfc", 800),
  uimg("1559339352-11d035aa65de", 800),
  uimg("1517248135467-4c7edcad34c4", 800),
  uimg("1547592180-85f173990554", 800),
  uimg("1551024601-bec78aea704b", 800),
  uimg("1596797038530-2c107229654b", 800),
  uimg("1509440159596-0249088772ff", 800),
  uimg("1447933601403-0c6688de566e", 800),
];
