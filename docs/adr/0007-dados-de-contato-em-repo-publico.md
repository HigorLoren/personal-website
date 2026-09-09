# Dados de contato pessoais num repositório público e estático

Este repo é público e o site é SSG: tudo que estiver no código vai pré-renderado no HTML servido, pronto para harvesting.
O e-mail de contato é um alias descartável (não a conta pessoal), guardado em base64 em `src/lib/site.ts` (`emailEncoded`) e decodificado só no browser pelo componente client `<EmailLink>` — o HTML servido não traz o endereço em texto puro nem um `mailto:`. Sem JavaScript, e antes da hidratação, o link cai para o LinkedIn.
O site não hospeda o PDF do currículo: a versão anterior trazia celular e e-mail pessoais no corpo, e um PDF servido estaticamente não tem como ser ofuscado. A trajetória pública fica no LinkedIn; o Higor manda o CV sob pedido, dito no canal de e-mail em `/contato`.
A regra é reforçada por uma guarda de pre-commit (`scripts/precommit-privacy.mjs`) que barra e-mail cru, telefone, CPF e GPS/EXIF em `src/`, `public/` e `content/`. Contexto e checklist manual em `docs/privacy.md`.
O trade-off: o e-mail exige JavaScript para aparecer, o que adiciona um componente client a um site que de resto é totalmente estático (ver ADR-0001); e um portfólio sem CV para baixar tem mais atrito para quem recruta.
Alternativas descartadas: `mailto:` em texto puro (colhível por bots), formulário de contato com backend (fora do v1 — ver spec do portfolio-v1), e limpar o PDF do CV em vez de removê-lo (continua colhível e o vazamento volta fácil num export novo).
