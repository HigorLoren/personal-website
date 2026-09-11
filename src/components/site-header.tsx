import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          /* -m-2 p-2: 44px de alvo em volta do avatar sem mover nada */
          className="-m-2 flex shrink-0 items-center gap-2 p-2 font-display text-base font-semibold tracking-tight sm:text-lg"
        >
          <Image
            src="/assets/profile_avatar.webp"
            alt=""
            width={28}
            height={28}
            className="size-7 shrink-0 rounded-full border border-line"
            priority
          />
          {/* Abaixo de sm o nome não cabe ao lado da nav e passava por cima
              dela. Some da tela, permanece como nome acessível do link. */}
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {site.name}
          </span>
        </Link>
        <SiteNav />
      </Container>
    </header>
  );
}
