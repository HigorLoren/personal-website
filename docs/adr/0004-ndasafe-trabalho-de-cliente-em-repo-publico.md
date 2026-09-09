# `ndaSafe`: como trabalho de cliente aparece num repositório público

Este repo é público e alguns cases são de trabalho de cliente sob NDA. O
`CaseMeta` tem uma flag `ndaSafe`: quando `true`, o template do case esconde
qualquer link de repositório e só renderiza imagens guardadas em
`assets/cases/<slug>/public/` (áreas públicas do produto). Nome do cliente e
detalhe de estratégia de negócio nunca entram no conteúdo. A regra existe porque
a restrição vem do NDA, não do código — sem esta nota, alguém poderia "consertar"
o branch achando que é um bug e vazar material privado. Alternativas descartadas:
omitir os cases de cliente (perde prova de trabalho) ou manter o repo privado
(o site é ele mesmo a primeira prova de ofício).
