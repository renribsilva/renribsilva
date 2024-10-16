import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

const isDev = process.env.NODE_ENV === "development";
const baseUrl = isDev ? "http://localhost:3000" : "https://petricor-phi.vercel.app";
const imgUrl = `${baseUrl}/api/og`;

const og = {
  image: imgUrl,
  title: "Petricor",
  description: "Blog criado com Next.js e Notion dedicado ao aprendizado da escrita",
  keywords: "blog, nextjs, notion, escrita, ruína, paixão",
  url: "https://petricor.xyz",
  type: "link"
};

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link 
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wdth,wght@0,75..100,300..800;1,75..100,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" 
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        <meta name="description" content={og.description} />
        <meta name="keywords" content={og.keywords} />

        <meta property="og:image" content={og.image}/>
        <meta property="og:site_name" content={og.title}/>
        <meta property="og:title" content={og.title}/>
        <meta property="og:description" content={og.description}/>
        <meta property="og:url" content={og.url}/>
        <meta property="og:type" content={og.type} />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}