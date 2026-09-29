import { getLandingData } from "@/lib/content/landing";
import { FALLBACK_FAQS, FALLBACK_HERO, FALLBACK_TESTIMONIALS } from "@/lib/content/fallback";
import { siteConfig } from "@/lib/site";
import { HeroSection } from "@/components/landing/HeroSection";
import { ActivitiesSection } from "@/components/landing/ActivitiesSection";
import { WhyUsSection } from "@/components/landing/WhyUsSection";
import { ProgramsSection } from "@/components/landing/ProgramsSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { AlumniDestinationsSection } from "@/components/landing/AlumniDestinationsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export const revalidate = 60;

export default async function HomePage() {
  const data = await getLandingData();

  const heroTitle = data.settings.hero_title || FALLBACK_HERO.title;
  const heroSubtitle = data.settings.hero_subtitle || FALLBACK_HERO.subtitle;
  const heroImage = data.settings.hero_image || FALLBACK_HERO.image;

  const whatsapp = data.settings.contact_whatsapp || siteConfig.contact.whatsapp;

  // Data dari DB (/admin) diprioritaskan; fallback placeholder di lib/content/fallback.ts
  const testimonials = data.testimonials.length ? data.testimonials : FALLBACK_TESTIMONIALS;
  const faqs = data.faqs.length ? data.faqs : FALLBACK_FAQS;

  // urutan section mengikuti desain Aldenmoor (project sekolah)
  return (
    <SmoothScroll>
      <HeroSection title={heroTitle} subtitle={heroSubtitle} image={heroImage} />
      <ActivitiesSection activities={data.activities} />
      <WhyUsSection whatsapp={whatsapp} />
      <ProgramsSection programs={data.programs} />
      <StatsSection stats={data.stats} />
      <TestimonialsSection testimonials={testimonials} />
      <AlumniDestinationsSection destinations={data.destinations} />
      <FaqSection faqs={faqs} whatsapp={whatsapp} />

      {/* JSON-LD FAQ */}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />
      )}
    </SmoothScroll>
  );
}
