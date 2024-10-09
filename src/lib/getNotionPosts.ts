import { Client } from "@notionhq/client";
import NodeCache from "node-cache";
import { NOTION_DATABASE_ID, NOTION_TOKEN } from "./ServerConstants";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionPage } from "../notiontypes";
import { formatString } from "./formatString";

const notion = new Client({ auth: NOTION_TOKEN });
const databaseId = NOTION_DATABASE_ID;

// Cache de 30s
const cache = new NodeCache({ stdTTL: 30 }); 

export async function getNotionPosts(): Promise<QueryDatabaseResponse> {
  // Tenta obter os posts do cache
  const cachedPosts = cache.get<QueryDatabaseResponse>("posts");

  if (cachedPosts) {
    // console.log("Usando dados do cache");
    return cachedPosts; // Retorna dados do cache se disponíveis
  }

  try {
    const resNotionPosts: QueryDatabaseResponse = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending"
        }
      ],
    });

    // Armazena os posts no cache
    cache.set("posts", resNotionPosts);

    // console.dir(resNotionPosts, { depth: null, colors: true });

    return resNotionPosts; // Retornando a resposta completa
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }
}

// getNotionPosts();

// Função para extrair slugs dos posts
export function extractSlugsFromPosts(posts: NotionPage[]): string[] {
  return posts.map(post => {
    const pageProperty = post.properties.Page;
    // Aplica a formatação na string extraída da propriedade 'Page'
    return pageProperty.title.length > 0 ? formatString(pageProperty.title[0].plain_text).replace(/-+/g, "") : ""; 
  }).filter(page => page); // Filtra páginas vazias
}

