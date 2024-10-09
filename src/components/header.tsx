import Head from "next/head";
import React from "react";

interface HeaderProps {
  titlePre?: string;
  description?: string;
  keywords?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  titlePre = "Petricor", 
  description = "Blog criado com Next.js e Notion dedicado à escrita", 
  keywords = "blog, nextjs, notion, escrita, ruína, paixão" }) => {
  
  const defaultTitle = titlePre === "Petricor" ? "Petricor" : `${titlePre} | Petricor`;

  const metas = {
    title: defaultTitle,
    description: description,
    keywords: keywords
  };

  return (
    <Head>
      <title>{ metas.title }</title>
      <meta name="description" content={ metas.description } />
      <meta name="keywords" content={ metas.keywords } />
    </Head>
  );
};

export default Header;
