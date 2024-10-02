import fs from "fs";
import path from "path";
import { getSortedPostsData } from "./getCollection";
import { Datetime } from "../components/datetime"

const posts = getSortedPostsData();

export async function generateRSSFeed() {
  const posts = getSortedPostsData(); // Carrega os posts com frontmatter

  const date = () => {
    return (
      <Datetime
    )
  };

  const rssItemsXml = posts
    .filter((post) => !post.draft) // Filtra posts que não são rascunhos
    .map((post) => `
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
        <title>Meu Blog</title>
        <link>https://seusite.com</link>
        <description>Os posts mais recentes do meu blog</description>
        <language>pt-br</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${rssItemsXml}
      </channel>
    </rss>
  `;

  const rssPath = path.join(process.cwd(), "public", "rss.xml");
  fs.writeFileSync(rssPath, rssXml); // Salva o arquivo rss.xml na pasta public
}
