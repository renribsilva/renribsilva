// pages/_app.tsx

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { useMDXComponents } from "../mdx-components";
import { MDXProvider } from "@mdx-js/react"; // Importa o MDXProvider
import LayoutIndex from "../layout/layout_index";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { DefaultSeo } from "next-seo"; // Importa o DefaultSeo
import React from "react";
import "../styles/global.css";

// Configurações de SEO padrão
const SEO = {
  title: "Petricor - Blog",
  description: "Blog criado com Next.js e Notion dedicado à escrita",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://petricor-phi.vercel.app",
    site_name: "Petricor",
    images: [
      {
        url: "https://petricor-phi.vercel.app/api/og", // URL da imagem Open Graph
        width: 800,
        height: 600,
        alt: "Imagem do Petricor",
      },
    ],
  },
  twitter: {
    handle: "@seu_usuario", // Adicione seu handle do Twitter
    site: "@seu_usuario",
    cardType: "summary_large_image",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  // Obtém os componentes personalizados
  const components = useMDXComponents({});

  return (
    <ThemeProvider>
      <DefaultSeo {...SEO} /> {/* Adiciona SEO padrão */}
      <LayoutIndex>
        <MDXProvider components={components}>
          <Component {...pageProps} />
          <SpeedInsights />
          <Analytics />
        </MDXProvider>
      </LayoutIndex>
    </ThemeProvider>
  );
}
