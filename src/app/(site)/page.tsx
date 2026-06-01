import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { FeaturedDishes, ChefRecommendations, AIRecommendations } from "@/components/home/dish-sections";
import { HowItWorks } from "@/components/home/how-it-works";
import { WhyChoose, WhyDifferent } from "@/components/home/why-choose";
import { StoryTimeline, YemeniExperience } from "@/components/home/story";
import { Testimonials } from "@/components/home/testimonials";
import { Promotions } from "@/components/home/promotions";
import { LoyaltyPreview } from "@/components/home/loyalty";
import { LocationsPreview, UpcomingEvents } from "@/components/home/locations-events";
import { Gallery } from "@/components/home/gallery";
import { AppPromo, InstagramFeed } from "@/components/home/app-social";
import { LatestNews } from "@/components/home/latest-news";
import { FAQ } from "@/components/home/faq";
import { ContactCTA } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedDishes />
      <HowItWorks />
      <WhyChoose />
      <YemeniExperience />
      <Promotions />
      <ChefRecommendations />
      <AIRecommendations />
      <Testimonials />
      <WhyDifferent />
      <LocationsPreview />
      <Gallery />
      <AppPromo />
      <LatestNews />
      <InstagramFeed />
      <FAQ />
      <ContactCTA />
    </>
  );
}
