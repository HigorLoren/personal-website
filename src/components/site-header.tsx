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
          className="flex items-center gap-2 whitespace-nowrap font-display text-base font-semibold tracking-tight sm:text-lg"
        >
          <Image
            src="/assets/profile_avatar.webp"
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-full border border-line"
            priority
          />
          {site.name}
        </Link>
        <SiteNav />
      </Container>
    </header>
  );
}
