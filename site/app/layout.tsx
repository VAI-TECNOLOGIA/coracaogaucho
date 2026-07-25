import type { Metadata, Viewport } from "next";
import { tusker, passionate, proelium, inter } from "./fonts";
import { Analytics } from "@/components/Analytics";
import { NativeBridge } from "@/components/NativeBridge";
import { CHAMADO, TAGLINE, SITE_OFICIAL } from "@/lib/oficial";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://coracaogaucho.com.br";

/**
 * Título, descrição e compartilhamento saem do texto oficial da campanha.
 * Os ícones (favicon.ico, icon.png, apple-icon.png) e as imagens de
 * compartilhamento (opengraph-image.png, twitter-image.png) são resolvidos
 * pelas convenções de arquivo do Next em `app/` — por isso não são declarados
 * aqui: declarar duplicaria as tags.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Coração Gaúcho · Juliana Brizola e Edegar Pretto`,
    template: "%s · Coração Gaúcho",
  },
  description: CHAMADO.texto,
  applicationName: "Coração Gaúcho",
  keywords: [
    "Coração Gaúcho",
    "Juliana Brizola",
    "Edegar Pretto",
    "Rio Grande do Sul",
    "movimento",
    "o povo fala mais alto",
    "PDT",
  ],
  authors: [{ name: "Coração Gaúcho", url: SITE_OFICIAL }],
  creator: "Coração Gaúcho",
  publisher: "Coração Gaúcho",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Coração Gaúcho",
    title: `Coração Gaúcho · ${TAGLINE}`,
    description: CHAMADO.texto,
  },
  twitter: {
    card: "summary_large_image",
    title: `Coração Gaúcho · ${TAGLINE}`,
    description: CHAMADO.texto,
  },
  appleWebApp: {
    capable: true,
    title: "Coração Gaúcho",
    statusBarStyle: "black-translucent",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#004ca9",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${tusker.variable} ${passionate.variable} ${proelium.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Liga as animações de entrada só se houver JS. Sem esta classe o CSS
            mantém tudo visível — texto nunca some por falha de hidratação. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }} />
      </head>
      <body className="bg-cream text-ink flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="font-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-yellow focus:px-5 focus:py-3 focus:text-sm focus:uppercase focus:text-blue-900"
        >
          Pular para o conteúdo
        </a>
        <Analytics />
        <NativeBridge />
        {children}
      </body>
    </html>
  );
}
