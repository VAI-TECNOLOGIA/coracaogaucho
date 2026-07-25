import type { MetadataRoute } from "next";

/**
 * Manifest do PWA. Os ícones saem do ícone oficial da campanha (pasta Ajustes);
 * os `maskable` já vêm com margem de segurança para o recorte do Android.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Coração Gaúcho · Juliana Brizola e Edegar Pretto",
    short_name: "Coração Gaúcho",
    description:
      "Um chamado aos gaúchos e gaúchas para colocar o povo no centro das decisões e retomar o protagonismo do Rio Grande do Sul.",
    lang: "pt-BR",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#004ca9",
    theme_color: "#004ca9",
    categories: ["politics", "social"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
