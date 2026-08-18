import localFont from "next/font/local";

export const postGrotesk = localFont({
  src: [
    {
      path: "../../../public/fonts/PostGrotesk-Book-Trial.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PostGrotesk-Italic-Trial.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/PostGrotesk-Medium-Trial.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PostGrotesk-Bold-Trial.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-post-grotesk",
  display: "swap",
});

export const ogg = localFont({
  src: [
    {
      path: "../../../public/fonts/Ogg-Regular-Trial.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Ogg-Italic-Trial.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-ogg",
  display: "swap",
});

export const otSectorNarrow = localFont({
  src: [
    {
      path: "../../../public/fonts/OTSectorNarrow-RegularFill.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ot-sector-narrow",
  display: "swap",
});
