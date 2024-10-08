import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

interface HeaderProps {
  titlePre?: string;
  description?: string;
  keywords?: string;
  posttitle?: string; // Para o título do post
  postsubtitle?: string; // Para a descrição do post
}

export default function Header({ 
  titlePre = "", 
  description = "", 
  keywords = "", 
  posttitle = "", 
  postsubtitle = "" 
}: HeaderProps) {
  
  const { pathname } = useRouter(); 

  const defaultTitle = titlePre ? `${titlePre} | Petricor` : "Petricor";

  const metas = {
    title: defaultTitle,
    description: description,
    keywords: keywords
  };

  const og = {
    url: `https://petricor.xyz${pathname}`,
    posttitle: posttitle,
    postsubtitle: postsubtitle, 
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
      <meta property="og:description" content={og.postsubtitle} />
      <meta property="og:type" content={og.type} />
      <meta property="og:author_name" content={og.author_name} />
      <meta property="og:author_url" content={og.author_url} />
      <meta property="og:provider_name" content={og.provider_name} />
      <meta property="og:provider_url" content={og.provider_url} />
      <meta property="og:image" content={og.image} />
    </Head>
  );
}
