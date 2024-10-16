// components/Seo.tsx

import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";

interface SeoProps {
  title: string;
  description: string;
}

const Seo = ({ title, description }: SeoProps) => {
  const router = useRouter();
  const baseUrl = "https://petricor.xyz"; // URL base
  const imageUrl = `${baseUrl}/api/og`; // URL da imagem fixa

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: `${baseUrl}${router.asPath}`, // Usa router.asPath para obter a URL completa
        title: title,
        description: description,
        siteName: "Petricor",
        images: [
          {
            url: imageUrl, // Usa a imagem fixa
            width: 800,
            height: 600,
            alt: "Imagem com fundo brando e em preto a palavra Petricor",
          },
        ],
      }}
    />
  );
};

export default Seo;
