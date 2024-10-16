// pages/_app.tsx

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { useMDXComponents } from "../mdx-components";
import { MDXProvider } from "@mdx-js/react"; // Importa o MDXProvider
import LayoutIndex from "../layout/layout_index";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
// import { DefaultSeo } from "next-seo"; 
import React from "react";
import "../styles/global.css";

// Configurações de SEO padrão
// const SEO = {
//   title: "Petricor",
//   description: "Blog criado com Next.js e Notion dedicado ao aprendizado da escrita",
//   canonical: "https://petricor.xyz",
//   openGraph: {
//     type: "link",
//     locale: "pt_BR",
//     url: "https://petricor.xyz",
//     images: [
//       {
//         url: "https://petricor-phi.vercel.app/api/og", 
//         width: 800,
//         height: 600,
//         alt: "Imagem com fundo brando e a palavra Petricor em preto",
//       },
//     ],
//   },
// };

export default function App({ Component, pageProps }: AppProps) {
  // Obtém os componentes personalizados
  const components = useMDXComponents({});

  return (
    <ThemeProvider>
      {/* <DefaultSeo {...SEO} />  */}
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
