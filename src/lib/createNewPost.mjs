import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

// Função para obter os nomes dos arquivos
export const getFileNames = async () => {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  const fileNames = fs.readdirSync(postsDirectory);
  const postFiles = fileNames.filter(fileName => fileName.startsWith('post') && fileName.endsWith('.mdx'));

  const postNumbers = postFiles.map(fileName => {
    const match = fileName.match(/post(\d+)/);
    return match ? match[1] : null;
  }).filter(number => number !== null);

  return postNumbers;
}

// Função para obter o próximo nome de arquivo de post
const getNextPostFilename = async () => {
  const postFiles = await getFileNames();
  const postNumbers = postFiles.map(number => parseInt(number, 10));
  const maxPostNumber = postNumbers.length > 0 ? Math.max(...postNumbers) : 0;
  const nextPostNumber = maxPostNumber + 1;
  const filename = `post${nextPostNumber}.mdx`;

  return filename;
}

// Função para gerar ID a partir do nome do arquivo
const generateIdFromFileName = (fileName) => {
  return fileName.replace(/\.mdx$/, ''); // Remove a extensão .mdx
}

// Função para gerar slug a partir do título
const generateSlugFromTitle = (title) => {
  return title
    .normalize('NFD')
    .toLowerCase() // Converte para minúsculas
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/--+/g, '-') // Substitui múltiplos hífens por um
    .trim(); // Remove espaços no início e no final
}

// Função para criar o arquivo MDX
const createMDXFile = async (frontmatterData, content) => {
  const fileName = await getNextPostFilename();
  const filePath = path.join(process.cwd(), 'src/content/posts', fileName);

  // Gera o ID a partir do nome do arquivo
  const id = generateIdFromFileName(fileName);
  
  // Gera o slug a partir do título
  const slug = generateSlugFromTitle(frontmatterData.title);

  // Garante que id e slug sejam strings
  const idString = String(id);
  const slugString = String(slug);

  // Cria o frontmatter com id e slug como strings
  const frontmatterString = matter.stringify(content, {
    id: idString, // ID como string
    slug: slugString, // Slug como string
    ...frontmatterData, // Outras propriedades a seguir
  });

  try {
    fs.writeFileSync(filePath, frontmatterString);
    console.log(`Arquivo ${fileName} criado com sucesso!`);
  } catch (err) {
    console.error(`Erro ao criar o arquivo: ${err.message}`);
  }
};

// Exemplo de uso
createMDXFile({
  title: 'Título do Novo Post',
  date: new Date().toISOString(),
  mod: null,
  featured: false,
  draft: true,
  tags: [],
  description: 'Descrição do novo post',
}, 'Escreva aqui o conteúdo do post');
