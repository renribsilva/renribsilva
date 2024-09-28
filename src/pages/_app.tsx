import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { useMDXComponents } from "../mdx-components";
import { MDXProvider } from "@mdx-js/react"; // Importa o MDXProvider
import LayoutIndex from "../layout/layout_index";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React from "react";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {

  // Obtém os componentes personalizados
  const components = useMDXComponents({});

  return (
    <ThemeProvider>
      <LayoutIndex>
        <MDXProvider components={components}>
          <Component {...pageProps} />
          <SpeedInsights />
        </MDXProvider>
      </LayoutIndex>
    </ThemeProvider>
  );
}
