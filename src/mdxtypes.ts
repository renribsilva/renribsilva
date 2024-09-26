// Define a estrutura dos dados dos posts
export interface PostData {
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

export interface PostSlug {
  params: {
    slug: string;
  };
}

export interface PostId {
  params: {
    id: string;
  };
}
