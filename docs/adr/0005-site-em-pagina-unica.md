# Site em página única: `/sobre` vira a seção `/#sobre` da home

Este site é portfólio antes de ser estudo de caso: quem chega precisa ver, numa rolagem só, o que Higor faz bem, os cases e como ele trabalha.
A antiga rota `/sobre` (método, histórias e trajetória) passou a ser a seção `#sobre` da home, abaixo dos cases.
A rota redireciona de forma permanente para a âncora, no `next.config.ts`, para link já compartilhado continuar funcionando.
O menu aponta para a âncora e o sitemap não lista mais a rota.
A regra existe porque a divisão em páginas escondia a parte que mais interessa a quem contrata: o método só aparecia para quem clicava em "Sobre".
Alternativas descartadas: manter a rota e repetir o conteúdo na home (duas fontes para o mesmo texto) ou manter a rota e só linkar (o problema original).
Consequência: a home fica longa, e as faixas de fundo alternadas (pilares e Sobre) existem para separar os blocos.
Se um dia o conteúdo do Sobre crescer a ponto de pedir página própria, esta decisão é revisada, não contornada.
