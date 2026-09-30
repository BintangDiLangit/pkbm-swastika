import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ChevronRight, Clock, Share2, UserRound } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getBeritaById, getOtherBerita } from "@/lib/content/berita";
import { siteConfig, whatsappLink } from "@/lib/site";

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const berita = await getBeritaById(id);
  if (!berita) return { title: "Berita tidak ditemukan - PKBM SWASTIKA" };

  const description = berita.excerpt || berita.content.slice(0, 160);
  return {
    title: `${berita.title} - PKBM SWASTIKA`,
    description,
    openGraph: {
      title: berita.title,
      description,
      type: "article",
      url: `${siteConfig.url}/berita/${berita.id}`,
      images: berita.image ? [{ url: berita.image }] : undefined,
    },
  };
}

/** Isi berita diketik di textarea admin: baris kosong = paragraf baru. */
function toParagraphs(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function BeritaDetailPage({ params }: Props) {
  const { id } = await params;
  const berita = await getBeritaById(id);
  if (!berita) notFound();

  const others = await getOtherBerita(berita.id);
  const shareUrl = `${siteConfig.url}/berita/${berita.id}`;

  return (
    <>
      {/* judul & info berita */}
      <section className="relative overflow-hidden bg-navy-950">
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="container-premium relative pb-40 pt-20 md:pb-48 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-gold">
              Beranda
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden />
            <Link href="/berita" className="transition-colors hover:text-gold">
              Berita
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden />
            <span className="line-clamp-1 max-w-xs text-white">{berita.title}</span>
          </nav>

          {berita.category && (
            <span className="inline-block rounded-full bg-gold px-4 py-1.5 text-xs font-bold text-navy">{berita.category}</span>
          )}
          <h1 className="mt-5 max-w-4xl font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
            {berita.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" aria-hidden />
              <time>{berita.date}</time>
            </span>
            {berita.author && (
              <span className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-gold" aria-hidden />
                {berita.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* foto & isi */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="container-premium">
          {berita.image && (
            <div className="relative -mt-32 aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100 shadow-card-hover md:-mt-40">
              <Image
                src={berita.image}
                alt={berita.title}
                fill
                priority
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <article className={`mx-auto max-w-3xl ${berita.image ? "mt-12 md:mt-16" : "-mt-24 rounded-[2rem] bg-white p-8 shadow-card md:p-12"}`}>
            {berita.excerpt && (
              <p className="border-l-4 border-gold pl-5 text-lg font-medium leading-relaxed text-navy md:text-xl">
                {berita.excerpt}
              </p>
            )}
            <div className="mt-8 space-y-5 text-base leading-[1.8] text-slate-600 md:text-lg">
              {toParagraphs(berita.content).map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-8">
              <Link
                href="/berita"
                className="inline-flex items-center gap-2 font-heading text-sm font-bold text-navy transition-colors hover:text-gold-dark"
              >
                <ArrowLeft className="h-4 w-4" /> Kembali ke daftar berita
              </Link>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${berita.title}\n${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-navy-800"
              >
                <Share2 className="h-4 w-4" /> Bagikan ke WhatsApp
              </a>
            </div>

            <div className="mt-10 rounded-3xl bg-slate-50 p-6 text-sm text-slate-500 md:p-8">
              Ada pertanyaan seputar berita ini atau pendaftaran?{" "}
              <a
                href={whatsappLink(`Halo PKBM SWASTIKA, saya ingin bertanya tentang berita "${berita.title}".`)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-dark"
              >
                Hubungi kami via WhatsApp
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* berita lainnya */}
      {others.length > 0 && (
        <section className="section-padding bg-slate-50/60">
          <div className="container-premium">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Reveal>
                  <SectionLabel>Baca Juga</SectionLabel>
                </Reveal>
                <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">Berita Lainnya</h2>
              </div>
              <Link href="/berita" className="inline-flex items-center gap-2 font-heading text-sm font-bold text-navy hover:text-gold-dark">
                Semua berita <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {others.map((b, i) => (
                <Reveal key={b.id} delay={i * 0.1} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-500 hover:shadow-card-hover">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      {b.image && (
                        <Image
                          src={b.image}
                          alt={b.title}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                        />
                      )}
                      {b.category && (
                        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-navy backdrop-blur">
                          {b.category}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <p className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="h-4 w-4 text-gold" aria-hidden />
                        {b.date}
                      </p>
                      <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-snug text-navy transition-colors group-hover:text-gold-dark">
                        <Link href={`/berita/${b.id}`} className="after:absolute after:inset-0">
                          {b.title}
                        </Link>
                      </h3>
                      {b.excerpt && <p className="line-clamp-2 text-slate-500">{b.excerpt}</p>}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
