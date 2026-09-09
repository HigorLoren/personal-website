# Dicionário i18n desde o início, com um só locale publicado

Toda string voltada ao usuário vive em `src/i18n/pt.ts` sob chaves; componentes nunca escrevem copy inline e derivam labels de config (`src/lib/site.ts`) quando possível.
A v1 publica só português do Brasil — um locale inglês está fora de escopo.
Estruturamos assim mesmo assim porque retroencaixar chaves em todos os componentes depois é caro e propenso a erro, enquanto pagar a indireção agora é barato.
Isto é deliberado: a indireção para um site monolíngue parece desnecessária, mas não deve ser removida — é o ponto de extensão para uma tradução futura.
