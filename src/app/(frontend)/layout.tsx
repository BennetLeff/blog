import type { Metadata } from "next";
import { postGrotesk, ogg, otSectorNarrow } from "./fonts";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://whoisben.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bennet Leff",
    template: "%s — Bennet Leff",
  },
  description: "Personal website, engineering essays, and writings of Bennet Leff.",
  authors: [{ name: "Bennet Leff", url: siteUrl }],
  creator: "Bennet Leff",
  publisher: "Bennet Leff",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bennet Leff",
    description: "Personal website, engineering essays, and writings of Bennet Leff.",
    url: siteUrl,
    siteName: "Bennet Leff",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bennet Leff",
    description: "Personal website, engineering essays, and writings of Bennet Leff.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${postGrotesk.variable} ${ogg.variable} ${otSectorNarrow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AnalyticsTracker />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#d84715] focus:text-white focus:font-mono focus:text-sm focus:rounded focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
