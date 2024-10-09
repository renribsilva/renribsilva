import { Html, Head, Main, NextScript } from "next/document";
import React, { useEffect } from "react";
import { fetchFonts } from "../lib/fetchFont"; // Importar a função

export default function Document() {
  useEffect(() => {
    // Chamar a função fetchFonts para carregar as fontes
    fetchFonts();
  }, []);

  return (
    <Html lang="pt-BR">
      <Head>
        {/* Carregar links das fontes */}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wdth,wght@0,75..100,300..800;1,75..100,300..800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
