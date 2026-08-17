import localFont from "next/font/local";

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
