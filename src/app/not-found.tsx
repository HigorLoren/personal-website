import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <p className="font-display text-sm font-medium text-muted">404</p>
      <h1 className="mt-3 text-[length:var(--text-h1)] font-semibold tracking-tight">
        Página não encontrada
      </h1>
      <p className="mt-4 text-ink-soft">
        O link pode estar quebrado ou a página pode ter sido movida.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block w-fit border-b-2 border-accent pb-1 text-ink transition-colors hover:text-accent"
      >
        Voltar para o início
      </Link>
    </Container>
  );
}
