import { getLandingData, FALLBACK_HERO, FALLBACK_CONTACT } from "@/lib/data";
import { HeroSection } from "@/components/landing/HeroSection";
import { ActivitiesSection } from "@/components/landing/ActivitiesSection";
import { WhyUsSection } from "@/components/landing/WhyUsSection";
import { ProgramsSection } from "@/components/landing/ProgramsSection";
import { RecognitionSection } from "@/components/landing/RecognitionSection";
import { CTASection } from "@/components/landing/CTASection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { QuickLinksSection } from "@/components/landing/QuickLinksSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { AlumniDestinationsSection } from "@/components/landing/AlumniDestinationsSection";

export const revalidate = 60;

export default async function HomePage() {
  const data = await getLandingData();

  const heroTitle = data.settings.hero_title || FALLBACK_HERO.title;
  const heroSubtitle = data.settings.hero_subtitle || FALLBACK_HERO.subtitle;
  const heroImage = data.settings.hero_image || FALLBACK_HERO.image;

  const address = data.settings.contact_address || FALLBACK_CONTACT.address;
  const phone = data.settings.contact_phone || FALLBACK_CONTACT.phone;
  const whatsapp = data.settings.contact_whatsapp || FALLBACK_CONTACT.whatsapp;
  const email = data.settings.contact_email || FALLBACK_CONTACT.email;
  const maps = data.settings.contact_maps;

  return (
    <>
      <HeroSection title={heroTitle} subtitle={heroSubtitle} image={heroImage} />
      <ActivitiesSection activities={data.activities} />
      <WhyUsSection />
      <ProgramsSection programs={data.programs} />
      <RecognitionSection recognitions={data.recognitions} />
      <CTASection whatsapp={whatsapp} />
      <StatsSection stats={data.stats} />
      <TestimonialsSection testimonials={data.testimonials} />
      <FaqSection faqs={data.faqs} />
      <QuickLinksSection links={data.quickLinks} />
      <ContactSection
        address={address}
        phone={phone}
        whatsapp={whatsapp}
        email={email}
        maps={maps}
      />
      <AlumniDestinationsSection destinations={data.destinations} />

      {/* JSON-LD FAQ */}
      {data.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: data.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />
      )}
    </>
  );
}
