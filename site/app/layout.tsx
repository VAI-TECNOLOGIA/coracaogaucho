import type { Metadata, Viewport } from "next";
import { tusker, passionate, proelium, inter } from "./fonts";
import { Analytics } from "@/components/Analytics";
import { NativeBridge } from "@/components/NativeBridge";
import "./globals.css";

const SITE_URL = "https://coracaogaucho.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Coração Gaúcho · Juliana Brizola e Edegar Pretto",
    template: "%s · Coração Gaúcho",
  },
  description:
    "Um movimento pelo Rio Grande do Sul. Juliana Brizola e Edegar Pretto: o povo fala mais alto. Some-se, seja voluntário e ajude a construir um RS mais justo.",
  keywords: [
    "Coração Gaúcho",
    "Juliana Brizola",
    "Edegar Pretto",
    "Rio Grande do Sul",
    "campanha",
    "o povo fala mais alto",
  ],
  authors: [{ name: "Coração Gaúcho" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Coração Gaúcho",
    title: "Coração Gaúcho · O povo fala mais alto",
    description:
      "Um movimento pelo Rio Grande do Sul com Juliana Brizola e Edegar Pretto.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coração Gaúcho · O povo fala mais alto",
    description:
      "Um movimento pelo Rio Grande do Sul com Juliana Brizola e Edegar Pretto.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#004ca9",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${tusker.variable} ${passionate.variable} ${proelium.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <Analytics />
        <NativeBridge />
        {children}
      </body>
    </html>
  );
}
