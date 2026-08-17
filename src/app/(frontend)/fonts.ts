import localFont from "next/font/local";

export const postGrotesk = localFont({
  src: [
    {
      path: "../../../public/fonts/PostGrotesk-Thin-Trial.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PostGrotesk-ThinItalic-Trial.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../../public/fonts/PostGrotesk-Light-Trial.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PostGrotesk-LightItalic-Trial.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/fonts/PostGrotesk-Book-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PostGrotesk-Italic-Trial.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/PostGrotesk-Medium-Trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PostGrotesk-MediumItalic-Trial.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/fonts/PostGrotesk-Bold-Trial.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PostGrotesk-BoldItalic-Trial.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/fonts/PostGrotesk-Black-Trial.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PostGrotesk-BlackItalic-Trial.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-post-grotesk",
  display: "swap",
});

export const ogg = localFont({
  src: [
    {
      path: "../../../public/fonts/Ogg-Thin-Trial.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Ogg-ThinItalic-Trial.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Ogg-Light-Trial.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Ogg-LightItalic-Trial.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Ogg-Regular-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Ogg-Italic-Trial.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Ogg-Medium-Trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Ogg-MediumItalic-Trial.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Ogg-Bold-Trial.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Ogg-BoldItalic-Trial.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-ogg",
  display: "swap",
});

export const otSectorNarrow = localFont({
  src: [
    {
      path: "../../../public/fonts/OTSectorNarrow-RegularFill.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/OTSectorNarrow-RegularFillRotalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-ot-sector-narrow",
  display: "swap",
});

export const otSectorNarrowGrid = localFont({
  src: [
    {
      path: "../../../public/fonts/OTSectorNarrow-RegularGrid.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/OTSectorNarrow-RegularGridRotalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-ot-sector-narrow-grid",
  display: "swap",
});
