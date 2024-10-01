// Define a estrutura dos dados dos posts
export type PostData = {
  id: string;
  title: string;
  date: string;
  mod: string;
  slug: string;
  featured: boolean;
  draft: boolean;
  tags: string[];
  description: string;
  content: string; // Conteúdo bruto (MDX)
}

export type PostSlug = {
  params: {
    slug: string;
  };
}

export type PostId = {
  params: {
    id: string;
  };
}
