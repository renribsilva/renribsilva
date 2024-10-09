import { promises as fs } from "fs";
import path from "path";

export const fetchImage = async () => {
  try {
    // Caminho absoluto para o arquivo no sistema
    const filePath = path.join(process.cwd(), "public", "file.png");

    // Ler o arquivo de imagem
    const imageData = await fs.readFile(filePath);

    // Processar ou retornar os dados da imagem
    return imageData;
  } catch (error) {
    console.error("Erro ao carregar a imagem:", error);
    throw error;
  }
};
