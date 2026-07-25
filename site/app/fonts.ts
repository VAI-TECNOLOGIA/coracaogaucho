import localFont from "next/font/local";
import { Inter } from "next/font/google";

/**
 * Corpo de texto corrido. As 3 fontes da marca são de display/caps e não
 * comportam parágrafos longos com boa leitura; Inter (self-hosted pelo next/font)
 * é a neutra de apoio. Toda a personalidade vem de Tusker/Passionate/Proelium.
 */
export const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Tipografia oficial da marca Coração Gaúcho.
 * Fonte única de verdade — nenhuma fonte fora deste conjunto pode ser usada.
 */

// Display condensado pesado — usado em "GAÚCHO", títulos de impacto, números.
export const tusker = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../public/fonts/TuskerGrotesk-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/TuskerGrotesk-Semibold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/TuskerGrotesk-Bold.otf", weight: "700", style: "normal" },
  ],
});

// Manuscrita/script — usada em "Coração", "O povo fala mais alto", assinaturas emocionais.
export const passionate = localFont({
  variable: "--font-script",
  display: "swap",
  src: [{ path: "../public/fonts/FeelingPassionate.ttf", weight: "400", style: "normal" }],
});

// GT Proelium — caixa-alta condensada. Usada em rótulos, eyebrows, botões e
// elementos de UI curtos, onde o caps é característica da marca (não em corpo).
export const proelium = localFont({
  variable: "--font-label",
  display: "swap",
  src: [
    { path: "../public/fonts/GTProelium.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/GTProeliumItalic.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/GTProelium.otf", weight: "700", style: "normal" },
  ],
});
