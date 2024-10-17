import { ImageResponse } from "@vercel/og";
import React from "react";

export const config = {
  runtime: "edge",
};

const raleway = fetch(
  new URL("../../../public/Raleway-ExtraLight.ttf", import.meta.url)
)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch font: ${res.statusText}`);
    }
    return res.arrayBuffer();
  });

// Função para obter a URL a partir da requisição
function getUrlFromRequest(request) {
  const url = new URL(request.url);
  return url.href; // Retorna a URL completa
}

export default async function handler(request) {
  const ralewayData = await raleway;
  const { title } = {
    title: "Petricor",
  };

  // Obtém a URL da requisição
  const currentUrl = getUrlFromRequest(request);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          fontFamily: "Raleway",
        }}
      >
        <h1
          style={{
            fontSize: 200,
            color: "#272728",
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 40, color: "#272728" }}>
          Visite: <a href={currentUrl} style={{ color: "#272728", textDecoration: "underline" }}>{currentUrl}</a>
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Raleway",
          data: ralewayData,
        },
      ],
    }
  );
}
