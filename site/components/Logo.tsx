import Image from "next/image";
import { cn } from "@/lib/utils";

import iconeConfia from "@/public/brand/confia-mais.png";
import marcaCoracaoCreme from "@/public/brand/logo-coracao-gaucho.png";
import marcaCoracaoVerde from "@/public/brand/logo-coracao-gaucho-02.png";

/**
 * Marcas da campanha — arquivos oficiais (nada reconstruído em CSS).
 *
 *  - `confia`  → ícone oficial CONFIA+ (pasta Ajustes). É A LOGO da marca:
 *                usada no header, menu, rodapé e telas de chrome. Arte quadrada
 *                com fundo azul próprio, apresentada como selo arredondado.
 *  - `coracao` → lockup "Coração GAÚCHO · O povo fala mais alto". Arte do
 *                movimento, usada só na peça de destaque (hero).
 *
 * O tamanho vem SEMPRE do CSS (`className`) ou do `size`, nunca de width/height
 * calculados: o import estático entrega a proporção ao Next (sem CLS).
 */

const ALTURAS: Record<Size, string> = {
  xs: "h-[26px] w-[26px]",
  sm: "h-[34px] w-[34px] sm:h-[38px] sm:w-[38px]",
  md: "h-[46px] w-[46px]",
  lg: "h-[64px] w-[64px]",
};

type Size = "xs" | "sm" | "md" | "lg";

export function Logo({
  variant = "confia",
  tone = "escuro",
  size = "sm",
  priority = false,
  sizes,
  className,
}: {
  variant?: "confia" | "coracao";
  /** `escuro` = fundo escuro (arte clara) · `claro` = fundo claro (arte colorida) */
  tone?: "escuro" | "claro";
  size?: Size;
  priority?: boolean;
  /** Dica de largura para o srcset. Informe quando a logo for grande/fluida. */
  sizes?: string;
  className?: string;
}) {
  if (variant === "coracao") {
    const src = tone === "escuro" ? marcaCoracaoCreme : marcaCoracaoVerde;
    return (
      <Image
        src={src}
        alt="Confia+ RS — o povo fala mais alto"
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes ?? "(max-width: 640px) 60vw, 320px"}
        className={cn("h-auto w-auto object-contain", className)}
      />
    );
  }

  // CONFIA+ — selo quadrado. `border` sutil separa o selo do header azul.
  return (
    <Image
      src={iconeConfia}
      alt="Confia+ RS"
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes={sizes ?? "48px"}
      className={cn(
        "rounded-[22%] object-contain shadow-sm ring-1 ring-cream-soft/15",
        className ?? ALTURAS[size],
      )}
    />
  );
}
