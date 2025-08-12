import { HeroSection } from "@/components/hero-section";
import { ValueProposition } from "@/components/value-proposition";
import { GoalJourney } from "@/components/goal-journey";
import { AdditionalServices } from "@/components/additional-services";
import { AboutSection } from "@/components/about-section";
import { AchievementsGallery } from "@/components/achievements-gallery";
import { StatisticsOverview } from "@/components/statistics-overview";
import { MainGallery } from "@/components/main-gallery";
import { MediaPartners } from "@/components/media-partners";
import { TestimonialsIntro } from "@/components/testimonials-intro";
import { BookAppointmentCTA } from "@/components/book-appointment-cta";
import { ExpertiseAreas } from "@/components/expertise-areas";
import { ContactCTA } from "@/components/contact-cta";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <HeroSection />
      <ValueProposition />
      <GoalJourney />
      <AdditionalServices />
      <AboutSection />
      {/* <AchievementsGallery /> */}
      {/* <StatisticsOverview /> */}
      <MainGallery />
      {/* <MediaPartners /> */}
      <TestimonialsIntro />
      <BookAppointmentCTA />
      <ExpertiseAreas />
      <ContactCTA />
    </div>
  );
}
