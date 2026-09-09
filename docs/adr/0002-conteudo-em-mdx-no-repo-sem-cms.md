# Conteúdo versionado como MDX no repositório, sem CMS

Cada case é um par no repo: metadados tipados (`CaseMeta` em `src/content/cases/<slug>/meta.ts`) + prosa num `content.mdx` irmão.
Não há CMS nem camada de conteúdo externa (Contentlayer, headless CMS, Notion).
Escolhemos isso porque o volume é baixo (três cases na v1), o autor é quem edita, e manter o conteúdo sob controle de versão dá revisão por diff e deploy atômico junto com o código.
O trade-off: edição exige rodar o projeto e abrir um PR; não serve para quem não é dev.
Migrar para um CMS depois significa reescrever a camada de carregamento de conteúdo.
