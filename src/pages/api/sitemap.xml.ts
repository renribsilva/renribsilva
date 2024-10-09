import { NextApiRequest, NextApiResponse } from "next";
import { getAllPostSlugs, getUniqueTags } from "../../lib/getMDXPosts"; 
import { getNotionPosts, extractSlugsFromPosts } from "../../lib/getNotionPosts"; 
import { NotionPage } from "../../notiontypes"; 
import { formatString } from "../../lib/formatString"; // Importa a função formatString

const isDev = process.env.NODE_ENV === "development";
const BASE_URL = isDev
  ? "http://localhost:3000"
  : "https://petricor.xyz";

const Sitemap = async (req: NextApiRequest, res: NextApiResponse) => {
  const pages = [
    { path: "/", lastModified: new Date().toISOString() },
    { path: "/blog", lastModified: new Date().toISOString() },
    { path: "/lexico", lastModified: new Date().toISOString() },
    { path: "/sobre", lastModified: new Date().toISOString() },
    { path: "/tags", lastModified: new Date().toISOString() },
  ];

  const postSlugs = await getAllPostSlugs();

  postSlugs.forEach(({ params }) => {
    pages.push({
      path: `/blog/${params.slug}`,
      lastModified: new Date().toISOString(),
    });
  });

  const notionResponse = await getNotionPosts();
  const notionPosts = notionResponse.results as NotionPage[];
  const slugs = extractSlugsFromPosts(notionPosts); 

  slugs.forEach(slug => {
    pages.push({
      path: `/lexico/${slug}`,
      lastModified: new Date().toISOString(),
    });
  });

  // Obtenha as tags únicas com suas frequências
  const uniqueTagsWithFrequency = await getUniqueTags();

  // Acesse a propriedade correta ao adicionar as tags ao sitemap
  uniqueTagsWithFrequency.forEach(({ tag }) => {
    const formattedTag = formatString(tag); // Formata a tag
    pages.push({
      path: `/tags/${formattedTag}`, // Adiciona a tag formatada ao caminho
      lastModified: new Date().toISOString(),
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">
    ${pages
      .map(({ path, lastModified }) => {
        return `
        <url>
          <loc>${BASE_URL}${path}</loc>
          <lastmod>${lastModified}</lastmod>
        </url>`;
      })
      .join("")}
  </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
};

export default Sitemap;
