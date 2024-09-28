import { Client } from "@notionhq/client";
import { NOTION_DATABASE_ID, NOTION_TOKEN } from "./ServerConstants";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints"; // Importe o tipo correto

const notion = new Client({ auth: NOTION_TOKEN });
const databaseId = NOTION_DATABASE_ID;

export async function getNotionId(): Promise<QueryDatabaseResponse> {

  try {
    const resPosts: QueryDatabaseResponse = await notion.databases.query({
      database_id: databaseId,
    });

    console.dir(resPosts.results[0].id, { depth: null, colors: true });
    return resPosts; // Retornando a resposta completa
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }
}

getNotionId();
