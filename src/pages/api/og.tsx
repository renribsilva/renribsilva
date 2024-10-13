import { ImageResponse } from "@vercel/og";
import React from "react";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  // Defina a URL base de acordo com o ambiente
  const baseUrl = process.env.NODE_ENV === "production" 
    ? "https://petricor-phi.vercel.app" 
    : "http://localhost:3000";

  // Crie a URL para a imagem no diretório public
  const imageUrl = new URL("/file.png", baseUrl).toString();

  // Fetch a imagem
  const res = await fetch(imageUrl);

  // Verifique se a resposta é válida
  if (!res.ok) {
    return new Response("Failed to load image", { status: 500 });
  }

  // Obtenha os dados da imagem como um buffer
  const imageBuffer = await res.arrayBuffer(); 

  // Converta o buffer em Base64
  const base64Image = Buffer.from(imageBuffer).toString("base64");

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
          background: "#000000",
        }}
      >
        <img 
          src={`data:image/png;base64,${base64Image}`} 
          alt="File Image" 
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
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
