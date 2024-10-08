import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

interface HeaderProps {
  titlePre?: string;
  description?: string;
  keywords?: string;
  posttitle?: string; // Para o título do post
  postsubtitle?: string; // Para a descrição do post
  posttags?: string[]; // posttags é um array de strings
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
  const baseUrl = isDev ? "http://localhost:3000" : `https://${process.env.VERCEL_URL}`;
  const fullUrl = `${baseUrl}${asPath}`;  // Construir a URL completa
  
  const defaultTitle = titlePre === "Petricor" ? "Petricor" : `${titlePre} | Petricor`;

  const metas = {
    title: defaultTitle,
    description: description,
    keywords: keywords,
  };

  const og = {
    url: fullUrl,  
    posttitle: posttitle,
    postsubtitle: postsubtitle,
    posttags: posttags.join(", "), 
    type: "link",  
    author_name: "renribsilva",
    author_url: "https://ursal.zone/@renribsilva",
    provider_name: "Petricor",
    provider_url: "https://petricor.xyz",
    image: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/file.png`  // Caminho para a imagem
      : "http://localhost:3000/file.png", // Caminho local da imagem
  };

  return (
    <Head>
      <title>{metas.title}</title>
      <meta name="description" content={metas.description} />
      <meta name="keywords" content={metas.keywords || og.posttags} />

      {/* Meta tags do Open Graph */}
      <meta property="og:url" content={og.url} />
      <meta property="og:title" content={og.posttitle} />
      <meta property="og:description" content={og.postsubtitle} />
      <meta property="og:type" content={og.type} />
      <meta property="og:image" content={og.image} />
      <meta property="og:site_name" content={og.provider_name} />
      
      {/* Twitter Card Meta Tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:title" content={og.posttitle} />
      <meta name="twitter:description" content={og.postsubtitle} />
      <meta property="twitter:image" content="Twitter link preview image URL" />
      
    </Head>
  );
}
