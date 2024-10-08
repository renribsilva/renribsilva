import { NextApiResponse } from "next";
import RSS from "rss";
import { getSortedPostsData } from "../../lib/getMDXPosts"; // Certifique-se de que o caminho está correto

export default async function handler(_: unknown, res: NextApiResponse) {
    // Cria um novo feed RSS
    const feed = new RSS({
        title: "Petricor",
        description: "Os textos mais recentes do blog",
        feed_url: "https://petricor.xyz/api/rss.xml", // URL final para o feed RSS
        site_url: "https://petricor.xyz/",
        language: "pt-BR",
    });

    // Obtém os posts e adiciona ao feed
    const allPosts = await getSortedPostsData();
    allPosts.forEach((post) => {
        // Limita a descrição a 100 caracteres
        const description = post.content.slice(0, 100) + (post.content.length > 100 ? "..." : "");

        feed.item({
            title: `${post.title}: ${post.subtitle}`,
            description: description,
            url: `https://petricor.xyz/blog/${post.slug}`, // Caminho para os posts
            categories: post.tags || [],
            author: "renribsilva",
            date: post.date,
            // Usando enclosure para adicionar a imagem
            enclosure: {
                url: "https://petricor.xyz/file.png", // URL da imagem
                type: "image/png" // Tipo da imagem
            },
            // Se você quiser adicionar um campo image_url, você pode fazer assim, mas nem todos os leitores de feed reconhecerão isso:
            custom_elements: [
                { image_url: "https://petricor.xyz/file.png" }, // Campo personalizado
            ],
        });
    });

    // Define os headers da resposta para XML
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.status(200).send(feed.xml({ indent: true }));
}
