import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

interface HeaderProps {
  titlePre?: string;
}

const Header = ({ titlePre = "" }: HeaderProps) => {

  const { pathname } = useRouter(); // Chama o useRouter dentro do componente

  const defaultTitle = titlePre ? `${titlePre} | Petricor` : "Petricor";

  const metas = {
    url: `https://petricor.xyz${pathname}`,
    title: "Petricor",
    description: "Bem-vindo ao Petricor",
    type: "link",
    author_name: "renribsilva",
    provider_name: "Petricor",
    provider_url: "https://petricor.xyz",
    image: null, 
  };

  return (
    <Head>
      <title>{defaultTitle}</title>

      {/* Meta tags do Open Graph */}
      <meta property="og:url" content={metas.url} />
      <meta property="og:title" content={metas.title} />
      <meta property="og:description" content={metas.description} />
      <meta property="og:type" content={metas.type} />
      <meta property="og:author" content={metas.author_name} />
      <meta property="og:site_name" content={metas.provider_name} />
      <meta property="og:provider_url" content={metas.provider_url} />
      <meta property="og:image" content={metas.image} />
    </Head>
  );
};

export default Header;
