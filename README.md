# Olá

Petricor é um saite-blog feito por um completo amador. 

## adicionar postagem

os textos podem ser adicionados criando um novo arquivo markdown em src/content/. Para gerá-lo, basta executar o arquivo

* src/lib/createNewPost.mjs

por meio de um executor, tal como o plugin [CodeRunner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) para o [VSCode](https://code.visualstudio.com/). isso deverá criar um arquivo 

* src/content/post[number].mdx

o qual terá o seguinte _frontmatter_

`---
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
Escreva o texto aqui`