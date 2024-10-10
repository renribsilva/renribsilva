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

  // Gera a resposta XML
  const oEmbedResponseXML = `
    <?xml version="1.0" encoding="utf-8"?>
    <oembed>
      <version>1.0</version>
      <type>photo</type>
      <provider_name>Petricor</provider_name>
      <provider_url>https://petricor.xyz</provider_url>
      <title>Petricor - Um Blog de Escrita</title>
      <author_name>renribsilva</author_name>
      <author_url>https://ursal.zone/@renribsilva</author_url>
      <url>https://petricor.xyz</url>
      <description>Explore artigos e textos envolventes sobre escrita, paixão e reflexão.</description>
      <thumbnail_url>https://petricor.xyz/file.png</thumbnail_url>
      <thumbnail_width>600</thumbnail_width>
      <thumbnail_height>400</thumbnail_height>
    </oembed>
  `;

  // Remove qualquer espaço em branco antes da declaração XML
  const trimmedXML = oEmbedResponseXML.trim();

  // Define o cabeçalho Content-Type como application/xml
  res.setHeader("Content-Type", "application/xml");
  
  // Retorna a resposta XML
  res.status(200).send(trimmedXML);
}
