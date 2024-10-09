import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

interface HeaderProps {
  titlePre?: string;
  description?: string;
  keywords?: string;
  posttitle?: string;
  postsubtitle?: string;
  posttags?: string[];
  postImageUrl?: string; // Imagem específica do post
  videoUrl?: string; // URL do vídeo para Twitter Player
}

const Header: React.FC<HeaderProps> = ({
  titlePre = "Petricor",
  description = "Blog criado com Next.js e Notion dedicado à escrita",
  keywords = "blog, nextjs, notion, escrita, ruína, paixão",
  posttitle = "",
  postsubtitle = "",
  posttags = [],
  postImageUrl = "",
  videoUrl = "", // URL do vídeo a ser renderizado no Twitter Player
}) => {
  const { asPath } = useRouter();
  const isDev = process.env.NODE_ENV === "development";
  const baseUrl = isDev ? "http://localhost:3000" : "https://petricor.xyz";
  const fullUrl = `${baseUrl}${asPath}`;
  const imgUrl = postImageUrl || `${baseUrl}/default-image.png`;

  const defaultTitle = titlePre === "Petricor" ? "Petricor" : `${titlePre} | Petricor`;

  const metas = {
    title: defaultTitle,
    description,
    keywords: keywords || posttags.join(", "),
  };

  const og = {
    url: fullUrl,
    posttitle: posttitle || metas.title,
    postsubtitle: postsubtitle || metas.description,
    posttags: posttags.join(", "),
    type: "link", // Definido como artigo
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

      {/* Meta tags do OpenGraph */}
      <meta property="og:url" content={og.url} />
      <meta property="og:title" content={og.posttitle} />
      <meta property="og:description" content={og.postsubtitle} />
      <meta property="og:type" content={og.type} />
      <meta property="og:image" content={og.image} />
      <meta property="og:site_name" content={og.provider_name} />

      {/* oEmbed fallback */}
      <link rel="alternate" type="application/json+oembed" href={`${fullUrl}/oembed.json`} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content={videoUrl ? "player" : "summary_large_image"} />
      <meta name="twitter:title" content={og.posttitle} />
      <meta name="twitter:description" content={og.postsubtitle} />
      <meta name="twitter:image" content={og.image} />

      {/* Twitter Player Meta Tags - se houver vídeo */}
      {videoUrl && (
        <>
          <meta name="twitter:player" content={videoUrl} />
          <meta name="twitter:player:width" content="1280" />
          <meta name="twitter:player:height" content="720" />
        </>
      )}
    </Head>
  );
};

export default Header;
