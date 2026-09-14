# `clientWork`: trabalho de cliente sob contrato num repositório público

Substitui a ADR-0004, que partia de uma premissa errada: o trabalho de cliente deste repo não está sob NDA, está sob contrato.
O contrato permite descrever o trabalho, mas proíbe expor regra ou método de negócio, nome de API externa e segredo comercial.
O `CaseMeta` tem uma flag `clientWork`: quando `true`, o template do case esconde qualquer link de repositório e só renderiza imagens guardadas em `assets/cases/<slug>/public/` (áreas públicas do produto).
O comportamento é o mesmo da antiga `ndaSafe`; mudam o nome e o motivo.
O case não traz o nome real do produto nem do cliente, e o `timeline.ts` não nomeia o empregador. As duas omissões são escolha, não obrigação: nomear acrescentaria pouco ao case.
A regra existe porque a restrição vem do contrato, não do código: sem esta nota, alguém poderia "consertar" o branch achando que é um bug e publicar o que o contrato protege.
Alternativas descartadas: manter o nome `ndaSafe` (quem lê o código continuaria supondo um NDA que não existe) e remover a flag (a restrição sobre repositório e imagens continua valendo).
