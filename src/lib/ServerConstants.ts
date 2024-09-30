import "dotenv/config";

const normalizeId = (id) => {
  if (!id) {return id;} 
  if (id.length === 36) {return id;}
  if (id.length !== 32) {
    throw new Error(
      "O id da base de dados é inválido: ${id} deve ter comprimento de 32 caracteres"
    );
  }
  return `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(
    16,
    4
  )}-${id.substr(20)}`;
};

export const NOTION_TOKEN = process.env.NOTION_TOKEN;
export const NOTION_DATABASE_ID = normalizeId(process.env.NOTION_DATABASE_ID);