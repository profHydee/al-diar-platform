import { site } from "@/lib/site";
import { locations } from "@/lib/mock/data";

export function RestaurantJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.legalName,
    description: site.description,
    servesCuisine: ["Yemeni", "Middle Eastern", "Halal"],
    priceRange: "$$",
    url: site.url,
    telephone: site.phone,
    image: `${site.url}/og.jpg`,
    address: { "@type": "PostalAddress", streetAddress: "5421 Schaefer Rd", addressLocality: "Dearborn", addressRegion: "MI", postalCode: "48126", addressCountry: "US" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2500" },
    department: locations.map((l) => ({
      "@type": "Restaurant",
      name: l.name,
      telephone: l.phone,
      address: { "@type": "PostalAddress", streetAddress: l.address, addressLocality: l.city, addressRegion: l.state, postalCode: l.zip, addressCountry: "US" },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
