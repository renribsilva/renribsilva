# Olá

Petricor é um saite-blog feito por um completo amador. 

## adicionar postagem

Para adicionar novos arquivos markdown em src/content/, foi criada a função

* script/createNewPost.mjs

a qual pode ser executada por meio do plugin [CodeRunner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner), para o [VSCode](https://code.visualstudio.com/). Como consequência, será criado o arquivo

* src/content/post[number].mdx

o qual apresentará um _frontmatter_, tal como exemplificado abaixo

```
---
id: post2
slug: titulo-do-novo-post
title: Título do Novo Post
date: '2024-09-28T20:31:32.787Z'
mod: null
featured: false
draft: true
tags: []
description: Descrição do novo post
---
Escreva o texto aqui
```

Nele, deve-se alterar o título, o slug (endereço que aparece no navegor) e a descrição do post... acrescentar tags caso quiser e definir **false** para _draft_ quando o texto estiver pronto. E pluft! (_mod_ e _featured_ ainda estão em processo de desenvolvimento, de modo que não servem para nada)

## fazer a integração com o Notion

Para integrar com o Notion, é preciso

  * Criar uma [base de dados](https://www.notion.so/pt/help/create-a-database) no Notion com as seguintes variáveis
    1. Page
    2. Slug (texto)
    3. Published (caixa de checagem)

  * Gerar um [token](https://notion.com/my-integrations) no Notion e
    1. copiar e colar a chave em NOTION_TOKEN, no arquivo .env_ex
    2. renomear .env_ex para .env
    3. [permitir](https://www.notion.so/pt/help/add-and-manage-connections-with-the-api) que essa chave acesse a base de dados criada no Notion (muito importante!)

  * Obter o ID da base de dados do Notion, que pode ser feito de diferentes maneiras. Uma delas é copiar o número que aparece no endereço do navegador, mas isso pode ser confuso e frustante. Um jeito mais fácil e certo que encontrei foi criar uma função que retorna esse valor sem muito custo. Para tanto, é necessário
    1. ter um meio de visualizar o output das funções (eu optei pelo [sucrase](https://www.npmjs.com/package/sucrase))
    2. garantir que o VSCode tenha meios de ler as variável de ambiente .env (eu optei pelo pacote [dotenv](https://www.npmjs.com/package/dotenv), importado em /src/lib/ServerConstants.ts)
    3. executar a função script/getNotionId.mjs (eu optei por [CodeRunner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner), já mencionado anteriomente)
    4. copiar e colar o valor retornado à variável NOTION_DATABASE_ID em .env, já com esse nome.

    
