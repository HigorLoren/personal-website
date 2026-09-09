# Renderização estática de todas as rotas no Next.js (App Router)

O site é um portfólio sem conteúdo dinâmico por requisição, então todas as rotas são pré-renderadas em build (SSG) — `generateStaticParams` para os cases, nenhum componente que busca dados em tempo de requisição.
Consideramos Astro e um SPA Vite/React puro; ficamos no Next App Router pela familiaridade e por MDX de primeira classe via `@next/mdx`, aceitando o peso do framework num site pequeno.
O alvo de deploy é a Vercel (push na `main` publica).
A consequência é que recursos de servidor (SSR, server actions, route handlers dinâmicos) estão fora: adotá-los depois exige repensar a arquitetura.
