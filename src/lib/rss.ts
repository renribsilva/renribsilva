import fs from "fs";
import path from "path";
import { getSortedPostsData } from "./getCollection"; // Função que já existe e retorna os posts

export async function generateRSSFeed() {
  const posts = getSortedPostsData(); // Pegue os posts do seu blog ou conteúdo

  const rssItemsXml = posts.map((post) => `
    <item>
      <title>${post.title}</title>
      <link>${`https://petricor.xyz/textos/${post.slug}`}</link>
      <guid>${`https://petricor.xyz/textos/${post.slug}`}</guid>
      <description>${post.description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>
  `).join("");

  const rssXml = `
    <rss version="2.0">
      <channel>
        <title>Petricor</title>
        <link>https://petricor.xyz</link>
        <description>Os textos mais recentes do blog</description>
        <language>pt-br</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${rssItemsXml}
      </channel>
    </rss>
  `;

  const rssPath = path.join(process.cwd(), "public", "rss.xml");
  fs.writeFileSync(rssPath, rssXml); // Salva o arquivo rss.xml na pasta public
}
