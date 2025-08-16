import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { useMDXComponents } from "../mdx-components";
import { MDXProvider } from "@mdx-js/react";
import LayoutIndex from "../layout/layout_index";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  const components = useMDXComponents({});
  const router = useRouter();
  const base = "https://renribsilva.vercel.app";
  const url = `${base}${router.asPath}`;
  
  const title = pageProps.ogtitle
    ? pageProps.ogtitle
    : "renribsilva";

  const description = pageProps.ogdescription 
    ? pageProps.ogdescription
    : "Blog criado com Next.js e Notion dedicado ao aprendizado da escrita.";

  const image = pageProps.image
    ? pageProps.image
    : `${base}/api/og`;

  // Metadados Open Graph e Twitter
  return (
    <ThemeProvider defaultTheme="light" enableSystem={true}>
      <Head>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta property="og:image" content={image} /> */}
        <meta property="og:url" content={url} />
        <meta property="og:type" content="link" />
        <meta property="og:site_name" content="by renribsilva" />
        <meta property="og:author_name" content="renribsilva" />
        <meta property="og:provider_name" content="renribsilva" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Canonical */}
        <link rel="canonical" href={url} />

      </Head>
      <LayoutIndex >
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </LayoutIndex>
    </ThemeProvider>
  );
}
