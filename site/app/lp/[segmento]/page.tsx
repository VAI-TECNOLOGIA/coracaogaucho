import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/lp/LandingPage";
import { SEGMENTOS, getSegmento } from "@/lib/segmentos";

export function generateStaticParams() {
  return SEGMENTOS.map((s) => ({ segmento: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segmento: string }>;
}): Promise<Metadata> {
  const { segmento } = await params;
  const seg = getSegmento(segmento);
  if (!seg) return {};
  return {
    title: seg.seo.title,
    description: seg.seo.description,
    alternates: { canonical: `/lp/${seg.slug}` },
    openGraph: {
      title: `${seg.seo.title} · Coração Gaúcho`,
      description: seg.seo.description,
      url: `/lp/${seg.slug}`,
    },
  };
}

export default async function LPRoute({
  params,
}: {
  params: Promise<{ segmento: string }>;
}) {
  const { segmento } = await params;
  const seg = getSegmento(segmento);
  if (!seg) notFound();
  return <LandingPage seg={seg} />;
}
