# Privacidade num repositório público de portfólio

Este repo é público. Tudo que entra num commit — inclusive o que for removido
depois — fica no histórico do git para sempre. Este documento lista o que
proteger e como a guarda automática ajuda.

## Modelo de ameaça

| Risco | Vetor | Mitigação |
| --- | --- | --- |
| Spam / harvesting de e-mail | e-mail em texto puro no HTML servido (SSG pré-renderiza tudo) | ofuscar no client; alias dedicado, não o Gmail pessoal |
| Doxxing | endereço, telefone, CPF, data de nascimento, nomes/fotos de familiares | nunca publicar; só cidade/país |
| Vazamento de localização | GPS no EXIF de fotos e screenshots | limpar o EXIF antes de commitar (ver abaixo) |
| Rastreamento de equipamento | número de série da câmera, `OwnerName`, `Artist` no EXIF | idem |
| Metadados de PDF | `Author`/`Creator` no currículo em `public/cv/` | conferir antes de publicar o PDF |
| WHOIS | registro de domínio expõe nome + endereço + telefone | ativar WHOIS privacy no registrador (grátis na maioria) |

## Guarda automática (pre-commit)

`scripts/precommit-privacy.mjs` roda no `pre-commit` e verifica **apenas o que o
commit introduz**:

- **linhas adicionadas** (arquivos de texto): e-mail cru, CPF, telefone com
  contexto de contato, padrões de endereço/CEP;
- **imagens e PDFs staged**: tags de GPS/geolocalização e metadados
  identificáveis (via `exiftool`, se instalado).

Regra de severidade:

- mudança em `src/`, `public/` ou `content/` → **erro, bloqueia o commit**;
- em `docs/`, `scripts/` etc. → **aviso**, não bloqueia;
- GPS em imagem e CPF → **erro sempre**.

### Instalação

```bash
npm run hooks:install     # git config core.hooksPath .githooks
```

O `npm install` já faz isso pelo script `prepare`. Cada clone/worktree precisa
rodar uma vez (o `core.hooksPath` fica no `.git/config`, não é versionado).

### Comandos

```bash
npm run privacy:check     # roda a guarda manualmente sobre o que está staged
```

A guarda apenas **identifica** — não altera arquivos. A correção é manual (ver
"Corrigindo metadados de imagem/PDF").

### Pulando de propósito

```bash
git commit --no-verify
```

Use só quando o achado for um falso-positivo ou intencional — e justifique no
corpo do commit.

### Limitações

- Não é à prova de scrapers avançados; é rede de segurança contra vazamento
  acidental.
- Só olha o diff staged, não o histórico já existente nem o working tree
  inteiro. Para varredura ampla: `git grep` + `exiftool -r`.
- `exiftool` é opcional. Sem ele, imagens/PDF não são verificados e a guarda
  emite um aviso. Instale com `brew install exiftool`.
- O parser de diff assume caminhos sem espaço/aspas (padrão do repo).
- A guarda só aponta o problema; ela nunca reescreve arquivos.

## Corrigindo metadados de imagem/PDF

Quando a guarda acusa GPS ou metadado identificável, limpe manualmente e revise
o `git diff` antes de commitar. Precisa do `exiftool` (`brew install exiftool`).

Uma imagem:

```bash
exiftool -all= -tagsFromFile @ -icc_profile:all -overwrite_original public/assets/foto.webp
```

- `-all=` remove tudo (GPS, série da câmera, data, thumbnail, comentários…);
- `-tagsFromFile @ -icc_profile:all` devolve só o perfil de cor, pra não
  deslocar as cores no navegador;
- `-overwrite_original` grava no lugar, sem deixar `.original` de backup.

Conferir o que sobrou:

```bash
exiftool -G -a public/assets/foto.webp
```

Todas as imagens de `public/` de uma vez:

```bash
find public -type f \( -iname '*.webp' -o -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) \
  -exec exiftool -all= -tagsFromFile @ -icc_profile:all -overwrite_original {} +
```

**PDF** (currículo em `public/cv/`): o `exiftool` limpa os metadados do
documento, mas não o conteúdo. Para o `Author`/`Creator`:

```bash
exiftool -Author= -Creator= -Producer= -XMP:all= -overwrite_original public/cv/higor-lorenzon-cv.pdf
```

Confira também, abrindo o PDF, que o corpo não traz telefone nem endereço.

## Pendências conhecidas

- `src/lib/site.ts` guarda o e-mail pessoal do Higor em texto puro. Como a
  guarda só olha linhas novas, isso não bloqueia commits,
  mas continua sendo pré-renderizado no HTML. Follow-up: componente
  `<EmailLink>` que monta o `mailto:` só na hidratação, com `<noscript>`
  apontando para o LinkedIn, e trocar por um alias dedicado.
- `public/cv/higor-lorenzon-cv.pdf` — conferir se o PDF do currículo não traz
  telefone/endereço no corpo (a guarda só checa metadados, não o conteúdo).

## Checklist manual (fora do alcance do script)

- [ ] Domínio custom registrado com WHOIS privacy.
- [ ] E-mail publicado é um alias, não a conta pessoal principal.
- [ ] Nenhuma foto mostra fachada, placa de carro, documento ou correspondência.
- [ ] Screenshots de cases não expõem nome de cliente em texto, `alt` ou nome
      de arquivo (ver ADR-0004, `ndaSafe`).
- [ ] Sem telefone e sem endereço em qualquer página.
