import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Movimento } from "@/components/Movimento";
import { Juliana } from "@/components/Juliana";
import { Participe } from "@/components/Participe";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "O movimento" };

/** Página institucional completa (manifesto → movimento → Juliana → participe). */
export default function MovimentoPage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <Movimento />
        <Juliana />
        <Participe />
      </main>
      <Footer />
    </>
  );
}
