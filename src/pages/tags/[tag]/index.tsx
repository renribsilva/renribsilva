import { getPostsByTag, getUniqueTags } from "../../../lib/getMDXPosts";
import { PostData } from "../../../mdxtypes";
import Datetime from "../../../components/datetime";
import styles from "../../../styles/pages.module.css";
import React from "react";
import Link from "next/link";
import { formatString } from "../../../lib/formatString"; // Certifique-se de que o caminho esteja correto

export async function getStaticPaths() {
  const tags = getUniqueTags();
  const paths = tags.map(({ tag }) => ({
    params: { tag: formatString(tag) } // Aplica formatString aqui para as rotas
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { tag: string } }) {
  const formattedTag = params.tag; // Tag recebida da URL, que foi formatada

  // Busque o nome original da tag
  const originalTags = getUniqueTags(); // Acessa as tags originais
  const originalTag = originalTags.find(t => formatString(t.tag) === formattedTag)?.tag; // Obtém a tag original
  const posts = getPostsByTag(originalTag); // Usa a tag original para filtrar os posts

  return {
    props: {
      tag: originalTag, // Passa a tag original para o componente
      posts,
    },
  };
}

export default function TagPage({ tag, posts }: { tag: string; posts: PostData[] }) {
  return (
    <>
      <section className={styles.tags_tag_index}>
        <h1># {tag}</h1> {/* A tag agora deve ser a original */}
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Datetime date={post.date} semishort={true} />
              <Link href={`/blog/${post.slug}`}>
                {post.title}
                {post.subtitle && post.subtitle.length > 0 ? `: ${post.subtitle}` : ""}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

