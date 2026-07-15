import { cn } from "@/lib/utils";

/**
 * Marca "Coração Gaúcho" reconstruída em CSS a partir do manual:
 * "Coração" em script (Feeling Passionate) + "GAÚCHO" em display condensado
 * (Tusker Grotesk), com o "O" final transformado em escudo tricolor do RS.
 * Vetorial → nítida em qualquer tamanho, herda a cor via `tone`.
 */
export function Wordmark({
  className,
  tone = "green",
  size = "md",
}: {
  className?: string;
  tone?: "green" | "cream" | "blue";
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const gauchoColor =
    tone === "cream" ? "text-cream-soft" : tone === "blue" ? "text-blue-900" : "text-green";

  const sizes = {
    sm: { script: "text-xl", gaucho: "text-3xl", gap: "-mt-2" },
    md: { script: "text-3xl", gaucho: "text-5xl", gap: "-mt-3" },
    lg: { script: "text-5xl", gaucho: "text-7xl", gap: "-mt-4" },
    xl: { script: "text-6xl sm:text-7xl", gaucho: "text-8xl sm:text-9xl", gap: "-mt-5" },
  }[size];

  return (
    <div className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span className={cn("font-script text-red rotate-[-3deg]", sizes.script)}>Coração</span>
      <span className={cn("font-display font-bold flex items-center", sizes.gaucho, sizes.gap, gauchoColor)}>
        GAÚCH
        {/* "O" escudo tricolor */}
        <span
          aria-hidden
          className="rs-stripe inline-block rounded-[40%] ml-[0.02em]"
          style={{ width: "0.62em", height: "0.92em" }}
        />
      </span>
    </div>
  );
}
