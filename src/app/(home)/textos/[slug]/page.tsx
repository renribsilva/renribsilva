import { notFound } from 'next/navigation';
import { getSortedPostsData } from '../../../../lib/getMDXPosts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const allPosts = getSortedPostsData();
  const post = allPosts.find((p) => p.slug === slug);
  try {
    const { default: Post } = await import(`../../../../content/${post.id}.mdx`);
    
    return (
      <article>
        <Post />
      </article>
    );
  } catch (err) {
    notFound();
  }
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;