import Image from "next/image";

// Logo PKBM Swastika tampil langsung di atas latar (transparan, tanpa kotak).
// Teks logo aslinya hitam, jadi di latar gelap (navy) pakai varian "light"
// yang teksnya putih; di latar terang pakai varian "dark" (warna asli).
const SIZES = {
  sm: "h-10",
  md: "h-14",
  lg: "h-24",
} as const;

const SOURCES = {
  light: "/images/logo-light.png",
  dark: "/images/logo.png",
} as const;

export function Logo({
  size = "md",
  tone = "light",
  priority = false,
  className = "",
}: {
  size?: keyof typeof SIZES;
  tone?: keyof typeof SOURCES;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={SOURCES[tone]}
      alt="Logo PKBM Swastika"
      width={384}
      height={512}
      priority={priority}
      className={`w-auto shrink-0 object-contain ${SIZES[size]} ${className}`}
    />
  );
}
