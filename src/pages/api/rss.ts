import RSS from "rss";
import { getSortedPostsData } from "../../lib/getCollection"; // Ajuste o caminho conforme necessário

export async function GET() {
    const feed = new RSS({
        title: "Petricor Blog",
        description: "Os textos mais recentes do blog Petricor",
        generator: "RSS for Node and Next.js",
        feed_url: "https://petricor.xyz/rss.xml", // URL do feed
        site_url: "https://petricor.xyz",
        managingEditor: "seuemail@exemplo.com (Seu Nome)", // Substitua pelo seu e-mail
        webMaster: "seuemail@exemplo.com (Seu Nome)", // Substitua pelo seu e-mail
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
                    url: `https://petricor.xyz/textos/${post.slug}`, // Ajuste a URL conforme sua estrutura
                    categories: post.tags || [],
                    author: "Seu Nome", // Substitua pelo autor do post
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
