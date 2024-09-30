import "dotenv/config";

const normalizeId = (id) => {
  if (!id) {
    return id;
  }
  if (id.length === 36) {
    return id;
  }
  if (id.length !== 32) {
    throw new Error(
      `O id da base de dados é inválido: ${id} deve ter comprimento de 32 caracteres`
    );
  }
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
};

export const NOTION_TOKEN = process.env.NOTION_TOKEN;
export const NOTION_DATABASE_ID = normalizeId(process.env.NOTION_DATABASE_ID);
