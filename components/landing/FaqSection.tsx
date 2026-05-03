"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader";
import type { LandingFaq } from "@/lib/data";

export function FaqSection({ faqs }: { faqs: LandingFaq[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);
  if (!faqs.length) return null;

  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="FAQ"
          title="Pertanyaan yang"
          highlight="sering ditanyakan"
          description="Jawaban untuk hal yang paling sering ditanyakan calon peserta didik & keluarganya."
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-soft-200 overflow-hidden rounded-3xl border border-soft-200 bg-white shadow-soft">
          {faqs.map((f) => {
            const isOpen = open === f.id;
            return (
              <div key={f.id}>
                <button
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  className="flex w-full items-start gap-4 p-6 text-left transition-colors hover:bg-soft-50"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isOpen
                        ? "bg-primary-700 text-white"
                        : "bg-primary-50 text-primary-700"
                    }`}
                  >
                    {isOpen ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />}
                  </span>
                  <span className="flex-1 pt-1 font-bold text-ink">{f.question}</span>
                  {f.category && (
                    <span className="hidden rounded-full bg-soft-100 px-3 py-1 text-xs font-semibold text-ink-soft sm:inline-block">
                      {f.category}
                    </span>
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-[4.5rem] text-sm leading-relaxed text-ink-muted">
                        {f.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
