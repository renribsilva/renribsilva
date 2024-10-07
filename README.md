# Olá

Petricor é um saite-blog feito por um completo amador. 

## adicionar postagem

Para adicionar novos arquivos markdown em `src/content/`, foi criado o script

* `script/createNewPost.mjs`

o qual deve ser executado (por exemplo, chamando `node scripts/createNewPost.mjs` no terminal). Como consequência disso, será criado o arquivo

* `src/content/post[number].mdx`

o qual apresentará um _frontmatter_, tal como exemplificado abaixo

```
---
id: post2
slug: titulo-do-novo-post
title: Título do Novo Post
subtitle: Subtítulo do Novo Post
date: '2024-09-28T20:31:32.787Z'
draft: true
tags: []
---
Escreva o texto aqui
```

Nele, pode-se alterar as propriedade `title`, `subtitle`, `slug` (endereço que aparece no navegor) e `tags`. Quando o texto estiver pronto, basta definir `false` para a propriedade `draft` e pluft. Texto publicado!

## integrar com o Notion

Para integrar este código com o Notion, é preciso

  * Criar uma [base de dados](https://www.notion.so/pt/help/create-a-database) no Notion com as seguintes variáveis
    1. Page
    2. Slug (texto)
    3. Published (caixa de checagem)

  * Gerar um [token](https://notion.com/my-integrations) no Notion e
    1. copiar e colar a chave em `NOTION_TOKEN`, no arquivo `.env_ex`
    2. renomear `.env_ex` para `.env`
    3. [permitir](https://www.notion.so/pt/help/add-and-manage-connections-with-the-api) que essa chave acesse a base de dados criada no Notion (muito importante!)

  * Obter o número indentificador (id) da base de dados criada no Notion. Essa etapa pode ser feito de diferentes maneiras. Uma delas é copiar o número que aparece no endereço do navegador, mas isso pode ser confuso e frustante. Um jeito mais fácil e certo que encontrei foi criar um script que retorna esse valor sem muito custo. Para tanto, é necessário
    1. garantir que o VSCode tenha meios de ler as variável de ambiente `.env` na execução local de funções (eu optei pelo pacote [dotenv](https://www.npmjs.com/package/dotenv), importado em `/src/lib/ServerConstants.ts`)
    2. ter um meio de visualizar o output das funções (eu optei pelo [sucrase](https://www.npmjs.com/package/sucrase))
    3. executar o script `script/getNotionId.ts` (por exemplo, chamando `npx sucrase-node scripts/getNotionId.ts` no terminal)
    4. copiar e colar o valor retornado à variável `NOTION_DATABASE_ID` em `.env`, já com esse nome.

    
