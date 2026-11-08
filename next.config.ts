import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Next.js 16 cache and prefetching */
  cacheComponents: true,
  partialPrefetching: true,

  /* Optimasi Gambar Next.js */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  /* Security Headers Dasar */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  /* Fase 8: Migrasi Konten & Pengalihan URL Warisan WordPress */
  async redirects() {
    return [
      // Kategori WordPress lama diarahkan ke kanal Berita
      {
        source: "/category/:slug*",
        destination: "/berita",
        permanent: true,
      },
      // Tag WordPress lama diarahkan ke Berita
      {
        source: "/tag/:slug*",
        destination: "/berita",
        permanent: true,
      },
      // Arsip Penulis lama diarahkan ke Profil
      {
        source: "/author/:slug*",
        destination: "/profil",
        permanent: true,
      },
      // Format tanggal permalink WordPress: /YYYY/MM/DD/slug atau /YYYY/MM/slug
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:slug",
        destination: "/berita/:slug",
        permanent: true,
      },
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug",
        destination: "/berita/:slug",
        permanent: true,
      },
      // RSS / Feed lama diarahkan ke sitemap
      {
        source: "/feed/:path*",
        destination: "/sitemap.xml",
        permanent: true,
      },
      // Pintasan login / admin lama diarahkan ke Sanity Studio
      {
        source: "/wp-admin/:path*",
        destination: "/studio",
        permanent: false,
      },
      {
        source: "/wp-login.php",
        destination: "/studio",
        permanent: false,
      },
      // Tautan statis warisan umum
      {
        source: "/tentang-kami",
        destination: "/profil",
        permanent: true,
      },
      {
        source: "/sejarah",
        destination: "/profil#sejarah",
        permanent: true,
      },
      {
        source: "/ad-art",
        destination: "/profil#ad-art",
        permanent: true,
      },
      {
        source: "/struktur-pengurus",
        destination: "/profil#struktur",
        permanent: true,
      },
      {
        source: "/bimtren",
        destination: "/informasi-kampus#bimtren",
        permanent: true,
      },
      {
        source: "/beasiswa",
        destination: "/informasi-kampus#beasiswa",
        permanent: true,
      },
      {
        source: "/daftar-kampus",
        destination: "/informasi-kampus#kampus",
        permanent: true,
      },
      {
        source: "/putri-imaba",
        destination: "/puteri-imaba",
        permanent: true,
      },
      {
        source: "/putri",
        destination: "/puteri-imaba",
        permanent: true,
      },
    ];
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

