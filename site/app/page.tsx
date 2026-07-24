import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Movimento } from "@/components/Movimento";
import { Juliana } from "@/components/Juliana";
import { Participe } from "@/components/Participe";
import { Footer } from "@/components/Footer";

/**
 * Estrutura espelhada no site oficial: manifesto → movimento → Juliana Brizola
 * → participe. Os blocos "Propostas" (seis compromissos), "Números" e os
 * cartões de "jeito de governar" foram removidos — pré-campanha não apresenta
 * plano de governo.
 */
export default function Home() {
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
