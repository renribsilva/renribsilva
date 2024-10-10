import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Adiciona os cabeçalhos de CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Resposta ao pedido OPTIONS (verificação preliminar)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const oEmbedResponse = {
      version: "1.0",
      type: "link", // ou "video", "photo", "rich"
      provider_name: "Petricor",
      provider_url: "https://petricor.xyz",
      title: "Petricor - Um Blog de Escrita",
      author_name: "renribsilva",
      author_url: "https://ursal.zone/@renribsilva",
      url: "https://petricor.xyz",
      description: "Explore artigos e textos envolventes sobre escrita, paixão e reflexão.",
      thumbnail_url: "https://petricor.xyz/thumbnail.jpg",
      thumbnail_width: 600,
      thumbnail_height: 400,
    };

    res.status(200).json(oEmbedResponse);
  } catch (error) {
    console.error("Erro no oEmbed handler:", error);
    res.status(500).json({ message: "Erro no servidor ao processar o oEmbed" });
  }
}
