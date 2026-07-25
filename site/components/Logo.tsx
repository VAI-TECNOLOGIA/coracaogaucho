import Image from "next/image";
import { cn } from "@/lib/utils";

import marcaCoracaoCreme from "@/public/brand/logo-coracao-gaucho.png";
import marcaCoracaoVerde from "@/public/brand/logo-coracao-gaucho-02.png";
import marcaChapa from "@/public/brand/marca-juliana-edegar.png";

/**
 * Marcas oficiais da campanha — arquivos do manual (pasta Identidade Visual).
 * Nada de logo reconstruída em CSS: só os ativos aprovados.
 *
 *  - `chapa`   → "JULIANA BRIZOLA / EDEGAR PRETTO". É a marca do cabeçalho no
 *                site oficial; usamos no header/rodapé para dar continuidade.
 *  - `coracao` → "Coração GAÚCHO · O povo fala mais alto". Marca do movimento,
 *                usada nas peças de destaque (hero, cartões).
 *
 * `tone` escolhe a versão correta para o fundo: a arte creme só tem contraste
 * sobre azul/escuro, e a chapa azul só sobre creme/claro.
 *
 * O tamanho vem SEMPRE do CSS (`className`), nunca de width/height calculados:
 * o import estático já entrega a proporção ao Next (sem CLS), e deixar o CSS
 * mandar evita servir um arquivo pequeno esticado — que foi o que aconteceu
 * quando o hero pediu 544px e o `sizes` autorizava só 384px.
 */

const ALTURAS: Record<Size, string> = {
  xs: "h-[22px]",
  sm: "h-[30px] sm:h-[34px]",
  md: "h-[40px] sm:h-[46px]",
  lg: "h-[64px] sm:h-[76px]",
};

type Size = "xs" | "sm" | "md" | "lg";

export function Logo({
  variant = "chapa",
  tone = "escuro",
  size = "sm",
  priority = false,
  sizes,
  className,
}: {
  variant?: "chapa" | "coracao";
  /** `escuro` = fundo escuro (arte clara) · `claro` = fundo claro (arte colorida) */
  tone?: "escuro" | "claro";
  /** Altura padrão. Ignorado quando `className` define a dimensão (ex.: no hero). */
  size?: Size;
  priority?: boolean;
  /** Dica de largura para o srcset. Informe quando a logo for grande/fluida. */
  sizes?: string;
  className?: string;
}) {
  const chapa = variant === "chapa";
  const src = chapa ? marcaChapa : tone === "escuro" ? marcaCoracaoCreme : marcaCoracaoVerde;

  return (
    <Image
      src={src}
      alt={chapa ? "Juliana Brizola e Edegar Pretto" : "Coração Gaúcho — o povo fala mais alto"}
      priority={priority}
      // Sem `priority` a marca do rodapé/interior carrega só quando chega perto.
      loading={priority ? undefined : "lazy"}
      sizes={sizes ?? "(max-width: 640px) 60vw, 320px"}
      className={cn(
        "w-auto object-contain",
        // A chapa só existe em azul: sobre fundo escuro clareamos por filtro.
        chapa && tone === "escuro" && "brightness-0 invert",
        className ?? ALTURAS[size],
      )}
    />
  );
}
