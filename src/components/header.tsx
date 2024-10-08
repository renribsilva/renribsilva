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
    type: "link",
    author_name: "renribsilva",
    author_url: "https://ursal.zone/@renribsilva",
    provider_name: "Petricor",
    provider_url: "https://petricor.xyz",
    image: "/file.png", 
  };

  return (
    <Head>
      <title>{metas.title}</title>
      <meta name="description" content={metas.description} />
      <meta name="keywords" content={metas.keywords} />

      {/* Meta tags do Open Graph */}
      <meta property="og:url" content={og.url} />
      <meta property="og:title" content={og.posttitle} />
      <meta property="og:description" content={og.posttags} />
      <meta property="og:type" content={og.type} />
      <meta property="og:author_name" content={og.author_name} />
      <meta property="og:author_url" content={og.author_url} />
      <meta property="og:provider_name" content={og.provider_name} />
      <meta property="og:provider_url" content={og.provider_url} />
      <meta property="og:image" content={og.image} />
    </Head>
  );
}
