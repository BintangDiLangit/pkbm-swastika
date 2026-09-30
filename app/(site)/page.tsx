import { getLandingData } from "@/lib/content/landing";
import { FALLBACK_FAQS, FALLBACK_GALLERY, FALLBACK_HERO } from "@/lib/content/fallback";
import { siteConfig } from "@/lib/site";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProgramsSection } from "@/components/landing/ProgramsSection";
import { FeeScheduleSection } from "@/components/landing/FeeScheduleSection";
import { WhyUsSection } from "@/components/landing/WhyUsSection";
import { LegalitySection } from "@/components/landing/LegalitySection";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { AlumniDestinationsSection } from "@/components/landing/AlumniDestinationsSection";
import { RegistrationSteps } from "@/components/landing/RegistrationSteps";
import { FaqSection } from "@/components/landing/FaqSection";
import { ActivitiesSection } from "@/components/landing/ActivitiesSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { ContactSection } from "@/components/landing/ContactSection";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export const revalidate = 60;

export default async function HomePage() {
  const data = await getLandingData();

  const heroTitle = data.settings.hero_title || FALLBACK_HERO.title;
  const heroSubtitle = data.settings.hero_subtitle || FALLBACK_HERO.subtitle;
  const heroImage = data.settings.hero_image || FALLBACK_HERO.image;

  const whatsapp = data.settings.contact_whatsapp || siteConfig.contact.whatsapp;

  // Data dari DB (/admin) diprioritaskan; fallback di lib/content/fallback.ts.
  // Testimoni sengaja tanpa fallback: section disembunyikan sampai ada testimoni asli.
  const faqs = data.faqs.length ? data.faqs : FALLBACK_FAQS;
  const gallery = data.gallery.length ? data.gallery : FALLBACK_GALLERY;

  // Urutan: pembuka → program → biaya & jadwal → keunggulan & legalitas →
  // cerita alumni → cara daftar → FAQ → berita → galeri → kontak
  return (
    <SmoothScroll>
      <HeroSection title={heroTitle} subtitle={heroSubtitle} image={heroImage} />
      <ProgramsSection programs={data.programs} />
      <FeeScheduleSection whatsapp={whatsapp} />
      <WhyUsSection whatsapp={whatsapp} />
      <LegalitySection />
      <StatsSection stats={data.stats} />
      <TestimonialsSection testimonials={data.testimonials} />
      <AlumniDestinationsSection destinations={data.destinations} />
      <RegistrationSteps cta={{ href: "/pendaftaran", label: "Daftar Sekarang" }} whatsapp={whatsapp} />
      <FaqSection faqs={faqs} whatsapp={whatsapp} />
      <ActivitiesSection activities={data.activities} />
      <GallerySection items={gallery} />
      <ContactSection whatsapp={whatsapp} />

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
