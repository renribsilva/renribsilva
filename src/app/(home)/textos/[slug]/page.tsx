import { notFound } from 'next/navigation';
import { getSortedPostsData } from '../../../../lib/getMDXPosts';
import Datetime from '../../../../components/tsx/datetime';
import styles from './slug.module.css';
import ArchiveButton from '../../../../components/tsx/archive_button';
import Link from 'next/link';
import { formatString } from '../../../../lib/formatString';

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
        <header className={styles.post_header}>
          <div className={styles.post_title_container}>
            <Datetime date={post.date} />
            <hr></hr>
            <h2 className={styles.post_title}>[{post.title}]</h2>
          </div>
          {post.subtitle && 
            <p className={styles.post_subtitle}>{post.subtitle}</p>
          } 
        </header>
        <Post />
        {post.tags && post.tags.length > 0 && (
          <div className={styles.post_tags}>
            {post.tags.map((tag) => {
              const formattedTag = formatString(tag); 
              return (
                <li key={formattedTag}>
                  <Link href={`/arquivo/tag/${formattedTag}`} >
                    <ArchiveButton># {tag}</ArchiveButton>
                  </Link>
                </li>
              );
              })}
          </div>
        )}
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