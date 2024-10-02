import RSS from "rss";
import { getSortedPostsData } from "../../lib/getCollection"; // Ajuste o caminho conforme necessário

export default async function GET() {
    const feed = new RSS({
        title: "Petricor Blog",
        description: "Os textos mais recentes do blog",
        generator: "RSS for Node and Next.js",
        feed_url: "https://petricor.xyz/rss.xml", // URL do feed
        site_url: "https://petricor.xyz",
        copyright: `Copyright ${new Date().getFullYear().toString()}, Petricor`,
        language: "pt-BR",
        pubDate: new Date().toUTCString(),
        ttl: 60,
    });

    const allPosts = getSortedPostsData(); // Obtém todos os posts

    if (allPosts) {
        allPosts.forEach((post) => {
            if (!post.draft) { // Filtra os rascunhos
                feed.item({
                    title: post.title,
                    description: post.description,
                    url: `https://petricor.xyz/textos/${post.slug}`, 
                    categories: post.tags || [],
                    author: "renribsilva",
                    date: post.date,
                });
            }
        });
    }

    return new Response(feed.xml({ indent: true }), {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    });
}
