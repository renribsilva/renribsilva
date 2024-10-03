import { NextApiResponse } from "next";
import RSS from "rss";
import { getSortedPostsData } from "../../lib/getCollection"; // Certifique-se de que o caminho está correto

export default async function handler(_: unknown, res: NextApiResponse) {
    // Cria um novo feed RSS
    const feed = new RSS({
        title: "Petricor",
        description: "Os textos mais recentes do blog",
        feed_url: "https://petricor.xyz/api/rssFeed", // URL final para o feed RSS
        site_url: "https://petricor.xyz/",
        language: "pt-BR",
    });

    // Obtém os posts e adiciona ao feed
    const allPosts = await getSortedPostsData();
    allPosts.forEach((post) => {
        feed.item({
            title: post.title,
            description: post.description,
            url: `https://petricor.xyz/textos/${post.id}`, // Caminho para os posts
            categories: post.tags || [],
            author: "renribsilva",
            date: post.date,
        });
    });

    // Define os headers da resposta para XML
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.status(200).send(feed.xml({ indent: true }));
}
