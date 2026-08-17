import type { Metadata } from "next";
import { postGrotesk, ogg, otSectorNarrow, otSectorNarrowGrid } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bennet Leff",
  description: "Personal blog and writings of Bennet Leff",
};

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${postGrotesk.variable} ${ogg.variable} ${otSectorNarrow.variable} ${otSectorNarrowGrid.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
