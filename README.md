# renribsilva

renribsilva é um saite-blog um tanto minimalista feito por um completo amador.

## primeiros passos

No ambiente de desenvolvimento integrado, tal como o VSCode, instale as dependências chamando

```
sudo npm i
```

Isso deverá instalar alguns pacotes essenciais à aplicação, tais como `dotenv`, `sucrase`, dentre outros

## adicionar postagem

Para adicionar novos arquivos markdown em `src/content/`, execute o script 
`script/createNewPost.mjs` no terminal

```
node scripts/createNewPost.mjs
``` 

Como resultado disso, será criado o arquivo `src/content/post[number].mdx`
que apresentará um _frontmatter_, tal como exemplificado abaixo

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

No _frontmatter_, pode-se alterar as propriedade `title`, `subtitle`, `slug` (endereço que aparece no navegor) e `tags`. Quando o texto estiver pronto, basta definir `false` para a propriedade `draft` e pluft. Texto publicado!

## rodar a aplicação localmente

Uma vez definidas as variáveis em `.env`, pode-se rodar a aplicação localmente chamando, por 
exemplo, 

```
sudo npm run dev
```

no terminal. Em seguida, deve-se verificar o local no qual a aplicação foi compilada, a exemplo do código a abaixo:

```
▲ Next.js 14.2.16
  - Local:        http://localhost:3000
  - Environments: .env
```

Feito isso, ela já pode ser acessada pelo browser, acessando o endereço mostrado.



    
