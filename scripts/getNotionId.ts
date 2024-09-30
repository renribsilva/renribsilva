import { Client } from "@notionhq/client";
import { NOTION_TOKEN } from "../src/lib/ServerConstants";

const notion = new Client({ auth: NOTION_TOKEN });

async function getNotionId() {
  try {
    // Busca todos as base de dados, de modo que esta função não é adequada para
    // usuário que tenham mais do que um database
    const res = await notion.search({
      filter: {
        property: "object",
        value: "database",
      },
    });

    // Exibe apenas o id do database
    console.dir(res.results[0].id, { depth: null, colors: true });
  } catch (error) {
    console.error("Erro ao buscar bancos de dados:", error);
  }
}

getNotionId();