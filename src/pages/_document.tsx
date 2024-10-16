import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

// Função para gerar meta tags com base em informações passadas
const generateMetas = (props) => {
  const {
    titlePre = "Petricor",
    description = "Blog criado com Next.js e Notion dedicado à escrita",
    keywords = "blog, nextjs, notion, escrita, ruína, paixão",
    posttitle = "",
    postsubtitle = "",
    postImageUrl = "",
  } = props;

  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = isDev ? "http://localhost:3000" : "https://petricor-phi.vercel.app";
  const fullUrl = `${baseUrl}${props.path}`; // Supondo que `path` seja passado como prop
  const imgUrl = postImageUrl || `${baseUrl}/api/og`;

  const metas = {
    title: titlePre === "Petricor" ? "Petricor" : `${titlePre} | Petricor`,
    description,
    keywords,
  };

  return {
    metas,
    og: {
      url: fullUrl,
      posttitle: posttitle || metas.title,
      postsubtitle: postsubtitle || metas.description,
      image: imgUrl,
    },
  };
};

export default function Document(props) {
  const { metas, og } = generateMetas(props);

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
        <meta name="description" content={metas.description} />
        <meta name="keywords" content={metas.keywords} />
        
        {/* Meta tags do OpenGraph */}
        <meta property="og:url" content={og.url} />
        <meta property="og:title" content={og.posttitle} />
        <meta property="og:description" content={og.postsubtitle} />
        <meta property="og:image" content={og.image} />
        
        {/* Twitter Cards */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={og.posttitle} />
        <meta property="twitter:description" content={og.postsubtitle} />
        <meta property="twitter:image" content={og.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
