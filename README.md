# Petricor

Petricor é um saite-blog um tanto minimalista feito por um completo amador.

## primeiros passos

No ambiente de desenvolvimento integrado, tal como o VSCode, instale as dependências chamando, 
por exemplo, 

```
sudo npm i
```

no terminal, o que deverá instalar alguns pacotes essenciais para esta aplicação, tais como `dotenv`, `sucrase`, dentre outros, que são essenciais para rodá-la
localmente.

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

  * criar uma base de dados no Notion, conforme exemplificado [aqui](https://www.notion.so/pt/help/create-a-database), com as seguintes variáveis

    1. `Page`  
    2. `Slug` (texto)  
    3. `Published` (caixa de checagem)

  * gerar um token no Notion, neste link [aqui](https://notion.com/my-integrations), e em seguida
    
    1. copiar e colar a chave em `NOTION_TOKEN`, no arquivo `.env_ex`
    2. renomear `.env_ex` para `.env`
    3. permitir que essa chave acesse a base de dados criada no Notion (muito importante!), de acordo com as recomendações do Notions que podem ser acessadas [aqui](https://www.notion.so/pt/help/add-and-manage-connections-with-the-api)

  * obter o número indentificador (id) da base de dados criada no Notion
   
    1. executando o script `script/getNotionId.ts` (por exemplo, chamando ```npx sucrase-node scripts/getNotionId.ts``` no terminal)
    2. copiar e colar o output retornado à variável `NOTION_DATABASE_ID` em `.env`, já com esse nome.

## Rodar a aplicação localmente

Uma vez definidas as variáveis em `.env`, pode-se rodar a aplicação localmente chamando, por 
exemplo, 

```
sudo npm run dev
```

no terminal. Em seguida, verificar o local explicitado no terminal
no qual a aplicação foi compilada, a exemplo do código a abaixo, e acessar o http pelo browser.

```
▲ Next.js 14.2.16
  - Local:        http://localhost:3000
  - Environments: .env
```



    
