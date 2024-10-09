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

const Header: React.FC<HeaderProps> = ({ 
  titlePre = "Petricor", 
  description = "Blog criado com Next.js e Notion dedicado à escrita", 
  keywords = "blog, nextjs, notion, escrita, ruína, paixão",
  posttitle = "", 
  postsubtitle = "",
  posttags = [], 
}) => {
  
  const { asPath } = useRouter(); // Use asPath para obter o caminho da URL

  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = isDev ? "http://localhost:3000" : "https://petricor-il5caxhsq-renatos-projects-eebe1dd8.vercel.app";
  const fullUrl = `${baseUrl}${asPath}`; // Construir a URL completa
  const imgUrl = `${baseUrl}/file.png`; 
  
  const defaultTitle = titlePre === "Petricor" ? "Petricor" : `${titlePre} | Petricor`;

  const metas = {
    title: defaultTitle,
    description: description,
    keywords: keywords
  };

  const og = {
    url: fullUrl,  
    posttitle: posttitle,
    postsubtitle: postsubtitle,
    posttags: posttags.join(", "), 
    type: "website",
    author_name: "renribsilva",
    author_url: "https://ursal.zone/@renribsilva",
    provider_name: "Petricor",
    provider_url: "https://petricor.xyz",
    image: imgUrl
  };

  return (
    <Head>
      <title>{metas.title}</title>
      <meta name="description" content={metas.description} />
      <meta name="keywords" content={metas.keywords || og.posttags} />

      {/* Meta tags do Open Graph */}
      <meta property="og:url" content={og.url} />
      <meta property="og:title" content={og.posttitle || metas.title} />
      <meta property="og:description" content={og.postsubtitle || metas.description} />
      <meta property="og:type" content={og.type} />
      <meta property="og:image" content={og.image} />
      <meta property="og:site_name" content={og.provider_name} />
      
      {/* Twitter Card Meta Tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={og.posttitle || metas.title} />
      <meta property="twitter:description" content={og.postsubtitle} />
      <meta property="twitter:image" content={og.image} />
    </Head>
  );
};

export default Header;
