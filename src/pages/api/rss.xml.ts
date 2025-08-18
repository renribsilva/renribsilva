import { NextApiResponse } from "next";
import RSS from "rss";
import { getSortedPostsData } from "../../lib/getMDXPosts"; // Certifique-se de que o caminho está correto

export default async function handler(_: unknown, res: NextApiResponse) {
    // URL base do feed
    const baseUrl = "https://renribsilva.vercel.app";

    // Cria um novo feed RSS com o namespace MRSS
    const feed = new RSS({
        title: "renribsilva",
        description: "Os textos mais recentes do blog",
        feed_url: `${baseUrl}/api/rss`, // URL final para o feed RSS
        site_url: baseUrl,
        language: "pt-BR",
        custom_namespaces: {
            media: "http://search.yahoo.com/mrss/"
        }
    });

    // URL da imagem gerada pelo endpoint /api/og
    const imageUrl = `${baseUrl}/api/og`;

    // Define as dimensões da imagem
    const imageWidth = 1200; // Altere para a largura desejada
    const imageHeight = 630; // Altere para a altura desejada

    // Obtém os posts e adiciona ao feed
    const allPosts = await getSortedPostsData();
    allPosts.forEach((post) => {
        // Limita a descrição a 100 caracteres
        const description = post.content.slice(0, 100) + (post.content.length > 100 ? "..." : "");

        // Condicional para incluir subtitle apenas se existir
        const title = post.subtitle ? `${post.title}: ${post.subtitle}` : post.title;

        feed.item({
            title: title,
            description: description,
            url: `${baseUrl}/blog/${post.slug}`, // Caminho para os posts
            categories: post.tags || [],
            author: "renribsilva",
            date: post.date,
            custom_elements: [
                {
                    "media:content": {
                        _attr: {
                            url: imageUrl, // URL da imagem gerada
                            type: "image/png", // Especifica que a imagem é PNG
                            title: "renribsilva", // Título da imagem
                            alt: "Imagem de fundo branco com a palavra renribsilva em preto", // Texto alternativo
                            width: imageWidth, // Largura da imagem
                            height: imageHeight // Altura da imagem
                        }
                    }
                }
            ]
        });
    });

    // Define os headers da resposta para XML
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.status(200).send(feed.xml({ indent: true }));
}
