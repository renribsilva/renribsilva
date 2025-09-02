import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { formatString } from "../src/lib/formatString"; 

const postsDirectory = path.join(process.cwd(), "src/content");

const getNextPostFilename = async () => {
  const postNumbers = fs
    .readdirSync(postsDirectory)
    .filter(fileName => fileName.startsWith("post") && fileName.endsWith(".mdx"))
    .map(fileName => fileName.match(/post(\d+)/)?.[1])
    .filter(Boolean);
  const maxPostNumber = postNumbers.length ? Math.max(...postNumbers.map(Number)) : 0; 
  return `post${maxPostNumber + 1}.mdx`;
};

const getLocalDateInUTC = () => {
  const localDate = new Date();
  const utcOffset = -3; // UTC-3
  return new Date(localDate.getTime() + (utcOffset * 60 * 60 * 1000)).toISOString();
};

// Função que cria novo arquivo MDX
const createMDXFile = async (frontmatterData, content) => {
  
  const fileName = await getNextPostFilename();
  const filePath = path.join(process.cwd(), "src/content", fileName);
  const id = fileName.replace(/\.mdx$/, "");
  const slug = formatString(frontmatterData.title);
  const frontmatterString = matter.stringify(content, {
    id: String(id),
    slug: String(slug),
    ...frontmatterData,
  });

  try {
    fs.writeFileSync(filePath, frontmatterString);
    console.log(`Arquivo ${fileName} criado com sucesso!`);
  } catch (err) {
    console.error(`Erro: ${err.message}`);
  }
};

createMDXFile({
  title: "Título do Novo Post",
  subtitle: "Subtítulo do Novo Post",
  date: getLocalDateInUTC(),
  draft: true,
  tags: [],
}, "Escreva o texto aqui");
