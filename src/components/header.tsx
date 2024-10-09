import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

interface HeaderProps {
  titlePre?: string;
  description?: string;
  keywords?: string;
  posttitle?: string; // Título específico do post
  postsubtitle?: string; // Descrição do post
  posttags?: string[]; // Tags relacionadas ao post
}

const Header: React.FC<HeaderProps> = ({
  titlePre = "Petricor",
  description = "Blog criado com Next.js e Notion dedicado à escrita",
  keywords = "blog, nextjs, notion, escrita, ruína, paixão",
  posttitle = "",
  postsubtitle = "",
  posttags = [],
}) => {
  const { asPath } = useRouter(); // Pega a URL atual
  const isDev = process.env.NODE_ENV === "development";
  
  // Define a URL base: localhost em dev, produção em prod
  const baseUrl = isDev
    ? "http://localhost:3000"
    : "https://petricor.xyz";
    
  const fullUrl = `${baseUrl}${asPath}`; // Cria a URL completa da página
  const imgUrl = `${baseUrl}/file.png`; // URL da imagem padrão para OG e Twitter

  const defaultTitle = titlePre === "Petricor" ? "Petricor" : `${titlePre} | Petricor`;

  // Meta informações
  const metas = {
    title: defaultTitle,
    description,
    keywords: keywords || posttags.join(", "),
  };

  // Informações Open Graph e Twitter Cards
  const og = {
    url: fullUrl,
    posttitle: posttitle || metas.title, // Título do post, ou o título padrão
    postsubtitle: postsubtitle || metas.description, // Descrição do post, ou padrão
    posttags: posttags.join(", "), // Concatena tags do post em uma string
    type: "",
    author_name: "renribsilva",
    author_url: "https://ursal.zone/@renribsilva",
    provider_name: "Petricor",
    provider_url: "https://petricor.xyz",
    image: imgUrl,
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
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={og.posttitle} />
      <meta name="twitter:description" content={og.postsubtitle} />
      <meta name="twitter:image" content={og.image} />
    </Head>
  );
};

export default Header;
