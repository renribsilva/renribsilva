import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const oEmbedResponse = {
    version: "1.0",
    type: "link", // Especifica o tipo como "link"
    provider_name: "Petricor",
    provider_url: "https://petricor.xyz",
    title: "Petricor - Um Blog de Escrita",
    author_name: "renribsilva",
    author_url: "https://ursal.zone/@renribsilva",
    url: "https://petricor.xyz", // URL que será embutida
    description: "Leia artigos e textos sobre escrita, paixão ruína e reflexão.",
    thumbnail_url: "https://petricor.xyz/file.png", // Thumbnail associada ao link
    thumbnail_width: 600,
    thumbnail_height: 400,
  };

  res.status(200).json(oEmbedResponse);
}
