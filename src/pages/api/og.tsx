import { ImageResponse } from "@vercel/og";
import React from "react";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  // Crie a URL para a imagem no diretório public
  const imageUrl = new URL("/file.png", process.env.VERCEL_URL || "http://localhost:3000").toString();

  // Fetch a imagem
  const res = await fetch(imageUrl);

  // Verifique se a resposta é válida
  if (!res.ok) {
    return new Response("Failed to load image", { status: 500 });
  }

  // Obtenha os dados da imagem como um buffer
  const imageBuffer = await res.arrayBuffer(); 

  // Retorne a resposta da imagem
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#000000", // Fundo preto
        }}
      >
        <img 
          src={`data:image/png;base64,${Buffer.from(imageBuffer).toString("base64")}`} // Usando o buffer como URL da imagem
          alt="File Image" 
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain", // Mantém a proporção da imagem
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
