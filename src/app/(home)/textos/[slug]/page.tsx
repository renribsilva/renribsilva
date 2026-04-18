import { notFound } from 'next/navigation';
import { getSortedPostsData } from '../../../../lib/getMDXPosts';
import Datetime from '../../../../components/tsx/datetime';
import styles from './slug.module.css';
import ArchiveButton from '../../../../components/tsx/archive_button';
import TextNavLink from '../../../../components/tsx/text_nav_link';
import Link from 'next/link';
import { formatString } from '../../../../lib/formatString';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const allPosts = getSortedPostsData();
  const postIndex = allPosts.findIndex((p) => p.slug === slug);
  if (postIndex === -1) {
    notFound();
  }

  const post = allPosts[postIndex];
  const prevPost = allPosts[postIndex - 1];
  const nextPost = allPosts[postIndex + 1];

  try {
    const { default: Post } = await import(`../../../../content/${post.id}.mdx`);
    
    return (
      <article>
        <header className={styles.post_header}>
          <div className={styles.post_title_container}>
            <Datetime date={post.date} />
            <hr />
            <h2 className={styles.post_title}>[{post.title}]</h2>
          </div>
          {post.subtitle && 
            <p className={styles.post_subtitle}>{post.subtitle}</p>
          } 
        </header>
        <Post />
        <footer className={styles.post_footer}>
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
          <div className={styles.post_navigation}>
            {prevPost && (
              <TextNavLink
                href={`/textos/${prevPost.slug}`}
                ariaLabel={`Texto anterior: ${prevPost.title}`}
                direction="prev"
              />
            )}
            {nextPost && (
              <TextNavLink
                href={`/textos/${nextPost.slug}`}
                ariaLabel={`Próximo texto: ${nextPost.title}`}
                direction="next"
              />
            )}
          </div>
        </footer>
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