"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { EASE, VIEWPORT } from "@/lib/motion";
import type { LandingFaq } from "@/lib/content/landing";

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: LandingFaq;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE, delay: Math.min(index, 6) * 0.08 }}
      className={`rounded-2xl border transition-colors duration-300 ${
        isOpen ? "border-gold/50 bg-white shadow-card" : "border-slate-200 bg-white/60 hover:border-navy/20"
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
        >
          <span className="font-heading text-base font-semibold text-navy md:text-lg">{item.question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
              isOpen ? "bg-gold text-navy" : "bg-navy text-white"
            }`}
          >
            <Plus className="h-4 w-4" aria-hidden />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 leading-relaxed text-slate-500 md:px-8 md:pb-7">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection({ faqs, whatsapp }: { faqs: LandingFaq[]; whatsapp: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  if (!faqs.length) return null;

  const waLink = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Halo PKBM Swastika, saya ingin bertanya."
  )}`;

  return (
    <section id="faq" className="section-padding bg-slate-50/60">
      <div className="container-premium grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <SectionLabel>FAQ</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 text-4xl font-bold leading-tight text-navy md:text-5xl">
              Pertanyaan yang <span className="text-gold-dark">Sering Diajukan</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              Hal-hal yang paling sering ditanyakan calon peserta didik dan keluarganya. Belum
              menemukan jawabannya? Tim kami siap membantu.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8">
            <Button href={waLink} external variant="secondary">
              <MessageCircle className="h-4 w-4" /> Tanya via WhatsApp
            </Button>
          </Reveal>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
