import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { AppShell } from "@/components/AppShell/AppShell";

const exitaSans = localFont({
  variable: "--font-exita-sans",
  display: "swap",
  src: [
    { path: "../../public/fonts/Helvetica/helvetica_regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Helvetica/helvetica_oblique.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/Helvetica/helvetica_light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Helvetica/helvetica_lightoblique.otf", weight: "300", style: "italic" },
    { path: "../../public/fonts/Helvetica/helvetica_bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Helvetica/helvetica_boldoblique.otf", weight: "700", style: "italic" },
  ],
});

const exitaMono = localFont({
  variable: "--font-exita-mono",
  display: "swap",
  src: [{ path: "../../public/fonts/Helvetica/helvetica_cyr_oblique.ttf", weight: "400", style: "normal" }],
});

const exitaDisplay = localFont({
  variable: "--font-exita-display",
  display: "swap",
  src: [{ path: "../../public/fonts/bigger_display/BiggerDisplay.otf", weight: "700", style: "normal" }],
});

const screpka = localFont({
  variable: "--font-screpka",
  display: "swap",
  src: [{ path: "../../public/fonts/Screpka/Screpka.ttf", weight: "400", style: "normal" }],
});

export const metadata: Metadata = {
  title: "EXITA",
  description: "EXITA — Neural Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${exitaSans.variable} ${exitaMono.variable} ${exitaDisplay.variable} ${screpka.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
