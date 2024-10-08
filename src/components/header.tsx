import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

interface HeaderProps {
  titlePre?: string;
  description?: string;
  keywords?: string;
  posttitle?: string; // Para o título do post
  postsubtitle?: string; // Para a descrição do post
  posttags?: string[];   // posttags é um array de strings
}

export default function Header({ 
  titlePre = "Petricor", 
  description = "Blog criado com nextjs e notion dedicado à escrita", 
  keywords = "blog, nextjs, notion, escrita, ruína, paixão",
  posttitle = "", 
  postsubtitle = "",
  posttags = [], 
}: HeaderProps) {
  
  const { asPath } = useRouter();  // Use asPath em vez de pathname

  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = isDev ? "http://localhost:3000" : "https://petricor.xyz";
  const fullUrl = `${baseUrl}${asPath}`;  // Construir a URL completa
  
  const defaultTitle = titlePre === "Petricor" ? "Petricor" : `${titlePre} | Petricor`;

  const metas = {
    title: defaultTitle,
    description: description,
    keywords: keywords
  };

  const og = {
    url: fullUrl,  // URL completa com base no ambiente
    posttitle: posttitle,
    postsubtitle: postsubtitle,
    posttags: posttags.join(", "), // Converter array para string separada por vírgulas
    type: "article",  // Para postagens de artigos
    author_name: "renribsilva",
    author_url: "https://ursal.zone/@renribsilva",
    provider_name: "Petricor",
    provider_url: "https://petricor.xyz",
    image: "/file.png",  // Caminho para sua imagem
  };

  return (
    <Head>
      <title>{metas.title}</title>
      <meta name="description" content={metas.description} />
      <meta name="keywords" content={metas.keywords} />

      {/* Meta tags do Open Graph (Facebook e Instagram) */}
      <meta property="og:url" content={og.url} />
      <meta property="og:title" content={og.posttitle} />
      <meta property="og:description" content={og.postsubtitle || og.posttags} />
      <meta property="og:type" content={og.type} />
      <meta property="og:image" content={og.image} />
      <meta property="og:site_name" content={og.provider_name} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" /> {/* Opções: "summary", "summary_large_image" */}
      <meta name="twitter:site" content="@renribsilva" /> {/* Conta Twitter associada */}
      <meta name="twitter:title" content={og.posttitle} />
      <meta name="twitter:description" content={og.postsubtitle || og.posttags} />
      <meta name="twitter:image" content={og.image} />
      
      {/* Facebook-specific meta tags */}
      <meta property="fb:app_id" content="your_facebook_app_id" /> {/* Opcional: se tiver uma app do Facebook */}
    </Head>
  );
}
