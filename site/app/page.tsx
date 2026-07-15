import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Movimento } from "@/components/Movimento";
import { Propostas } from "@/components/Propostas";
import { Candidatos } from "@/components/Candidatos";
import { Numeros } from "@/components/Numeros";
import { SomeSe } from "@/components/SomeSe";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Movimento />
        <Propostas />
        <Candidatos />
        <Numeros />
        <SomeSe />
      </main>
      <Footer />
    </>
  );
}
