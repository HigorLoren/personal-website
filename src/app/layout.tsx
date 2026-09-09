import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { crimsonPro, plusJakartaSans } from "./fonts";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";
import "./globals.css";

const t = getDictionary();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: t.meta.titleDefault,
    template: t.meta.titleTemplate,
  },
  description: t.meta.description,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: t.meta.titleDefault,
    description: t.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: t.meta.titleDefault,
    description: t.meta.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${crimsonPro.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          {t.nav.skipToContent}
        </a>
        <SiteHeader />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
