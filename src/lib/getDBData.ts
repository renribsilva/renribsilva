import { Client } from "@notionhq/client";
import NodeCache from "node-cache";
import { NOTION_DATABASE_ID, NOTION_TOKEN } from "./ServerConstants";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints"; // Importe o tipo correto

const notion = new Client({ auth: NOTION_TOKEN });
const databaseId = NOTION_DATABASE_ID;

// Cache de 30s
const cache = new NodeCache({ stdTTL: 30 }); 

export async function getPosts(): Promise<QueryDatabaseResponse> {
  // Tenta obter os posts do cache
  const cachedPosts = cache.get<QueryDatabaseResponse>("posts");

  if (cachedPosts) {
    // console.log("Usando dados do cache");
    return cachedPosts; // Retorna dados do cache se disponíveis
  }

  try {
    const resPosts: QueryDatabaseResponse = await notion.databases.query({
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
    cache.set("posts", resPosts);

    // console.dir(resPosts, { depth: null, colors: true });

    return resPosts; // Retornando a resposta completa
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }
}

// getPosts();
