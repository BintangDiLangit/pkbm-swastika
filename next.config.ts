import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // ada package-lock.json lain di folder home; kunci root agar build standalone tidak salah folder
  outputFileTracingRoot: process.cwd(),
  images: {
    qualities: [75, 85],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
    ],
  },
};

export default nextConfig;
