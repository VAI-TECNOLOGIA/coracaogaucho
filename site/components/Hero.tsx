"use client";

import { motion } from "motion/react";
import { Wordmark } from "./Wordmark";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-blue-900 text-cream-soft"
    >
      {/* Camadas de fundo */}
      <div className="pointer-events-none absolute inset-0">
        {/* brilho azul */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_-10%,#0a3f8a_0%,#172d57_55%,#0e1c38_100%)]" />
        {/* faixa tricolor girando lenta */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 2, ease }}
          className="rs-stripe absolute -right-40 -top-40 h-[46rem] w-[46rem] rotate-12 rounded-[38%] blur-[2px]"
        />
        {/* vinheta */}
        <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_100%,rgba(0,0,0,0.35),transparent_60%)]" />
      </div>

      {/* faixa tricolor topo */}
      <div className="rs-bar absolute inset-x-0 top-0 h-1.5" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-24">
        {/* Coluna de texto */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="font-label mb-6 inline-flex items-center gap-2 rounded-full border border-cream-soft/20 bg-cream-soft/5 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-yellow"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-yellow" />
            Um movimento pelo Rio Grande do Sul
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            O RIO GRANDE
            <br />
            QUE <span className="rs-text-gradient">SE LEVANTA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.16 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream-soft/80 sm:text-xl"
          >
            Aqui o povo não é plateia — é protagonista. Com{" "}
            <strong className="font-semibold text-cream-soft">Juliana Brizola</strong> e{" "}
            <strong className="font-semibold text-cream-soft">Edegar Pretto</strong>, cada rua, cada
            bairro e cada gaúcho ganham voz. Porque{" "}
            <span className="font-script text-2xl text-yellow">o povo fala mais alto.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#some-se"
              className="font-label group inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-4 text-base uppercase tracking-wide text-cream-soft shadow-xl shadow-red/30 transition-transform hover:scale-[1.03] active:scale-95"
            >
              Some-se ao movimento
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#propostas"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-soft/25 px-7 py-4 text-base font-semibold text-cream-soft transition-colors hover:bg-cream-soft/10"
            >
              Conheça as propostas
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.5 }}
            className="mt-10 flex items-center gap-6 text-sm text-cream-soft/60"
          >
            <span>+497 municípios</span>
            <span className="h-4 w-px bg-cream-soft/20" />
            <span>Todas as regiões</span>
            <span className="h-4 w-px bg-cream-soft/20" />
            <span>Feito com o povo</span>
          </motion.div>
        </div>

        {/* Coluna da marca */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
          className="hidden justify-center lg:flex"
        >
          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(250,178,36,0.18),transparent_70%)]" />
            <div style={{ animation: "cg-float 6s ease-in-out infinite" }}>
              <Wordmark size="xl" tone="cream" />
              <p className="mt-4 text-center font-display text-sm font-semibold uppercase tracking-[0.4em] text-yellow">
                O povo fala mais alto
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.a
        href="#movimento"
        aria-label="Rolar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col items-center gap-2 text-cream-soft/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-cream-soft/30 pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-yellow"
          />
        </span>
      </motion.a>
    </section>
  );
}
