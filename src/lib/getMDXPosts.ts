import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostData, PostSlug, PostId } from "../mdxtypes"; // Importando os tipos

// Diretório dos posts
const postsDirectory = path.join(process.cwd(), "/src/content");

//////////////////////////////////////////////////////////
// Função para pegar dados dos posts, ordenados por data//
/////////////////////////////////////////////////////////

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, ""); 
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents); 

    return {
      id,
      ...matterResult.data,
      content: matterResult.content, // O conteúdo será processado em outra função
    } as PostData; 
  });

  // Filtra posts com draft: false
  const filteredPosts = allPostsData.filter((post) => post.draft === false);

  // Ordena os posts pela data
  const sortedPosts = filteredPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

  // console.log(sortedPosts);
  return sortedPosts;
}

//////////////////////////////////////////////////////////////////
// Função para pegar todos os posts relacionados a uma única tag//
//////////////////////////////////////////////////////////////////

export function getPostsByTag(tag: string) {

  const allPosts = getSortedPostsData();
  return allPosts.filter(post => post.tags.includes(tag));

}

/////////////////////////////////////////////////////////////////
// Função para pegar todos os posts relacionados a um único ano//
/////////////////////////////////////////////////////////////////

export function getPostsGroupedByYear() {

  const posts = getSortedPostsData();
  const groupedByYear: Record<string, PostData[]> = {};

  posts.forEach(post => {
    const year = new Date(post.date).getFullYear().toString();
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(post);
  });

  return groupedByYear;
}

export function getPostsByYear(ano: string): PostData[] {
  const posts = getSortedPostsData();  // A função que retorna os posts ordenados
  return posts.filter(post => new Date(post.date).getFullYear().toString() === ano);
}

export function getUniqueYears(): string[] {
  const posts = getSortedPostsData(); // Essa função deve retornar todos os posts com a data
  const years = posts.map(post => new Date(post.date).getFullYear().toString()); // Pegando apenas o ano
  return Array.from(new Set(years)); // Remover duplicatas
}

////////////////////////////////////
//Função para pegar todos os slugs//
////////////////////////////////////

export function getAllPostSlugs(): PostSlug[] {
  const allPosts = getSortedPostsData();
  const postslugs: PostSlug[] = allPosts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  // console.log(postslugs);
  return postslugs;
}

// getAllPostSlugs();

///////////////////////////////////
// Função para pegar todos os ids//
///////////////////////////////////

export function getAllPostIds(): PostId[] {
  const posts = getSortedPostsData();
  const postsids: PostId[] = posts.map((post) => ({
    params: {
      id: post.id,
    },
  }));

  // console.log(postsids);
  return postsids;
}

// getAllPostIds();

////////////////////////////////////////////////////////////////
// Função para pegar todas as tags únicas com suas frequências//
////////////////////////////////////////////////////////////////

export function getUniqueTags() {
  const posts = getSortedPostsData();

  // Extrair todas as tags de todos os posts e achatar o array
  const allTags: string[] = posts.flatMap((post) => post.tags);

  // Criar um objeto para contar as frequências das tags
  const tagFrequency: Record<string, number> = {};

  allTags.forEach((tag) => {
    tagFrequency[tag] = (tagFrequency[tag] || 0) + 1; // Incrementa a contagem da tag
  });

  // Transformar o objeto de frequência em um array de tuplas [tag, frequência]
  const uniqueTagsWithFrequency = Object.entries(tagFrequency).map(([tag, frequency]) => ({
    tag,
    frequency,
  }));

  // console.log(uniqueTagsWithFrequency);
  return uniqueTagsWithFrequency;
}

// getUniqueTags();

////////////////////////////////////////////////////
//Função para pegar os dados de um post específico//
////////////////////////////////////////////////////

export async function getPostData(slug: string): Promise<PostData> {
  const posts = getSortedPostsData();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    throw new Error("Post com slug ${slug} não encontrado");
  }

  // Retorna os dados do post e o conteúdo MDX
  const content: PostData = {
    id: post.id,
    title: post.title,
    subtitle: post.subtitle,
    date: post.date,
    slug: post.slug,
    draft: post.draft,
    tags: post.tags,
    content: post.content, // Passa o conteúdo bruto (MDX) para ser serializado posteriormente
  };

  // console.log(content);
  return content;
}
