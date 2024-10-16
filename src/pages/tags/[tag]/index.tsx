import { getPostsByTag, getUniqueTags } from "../../../lib/getMDXPosts";
import { PostData } from "../../../mdxtypes";
import Datetime from "../../../components/datetime";
import styles from "../../../styles/pages.module.css";
import React from "react";
import Link from "next/link";
import { formatString } from "../../../lib/formatString"; // Certifique-se de que o caminho esteja correto
import Header from "../../../components/header";
import Breadcrumb from "../../../components/breadcrumb";
import Seo from "../../../components/seo";

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
      tag: originalTag || "", // Passa a tag original ou uma string vazia
      posts,
    },
  };
}

export default function TagPage({ tag, posts }: { tag: string; posts: PostData[] }) {
  return ( 
    <>
      <Seo 
        title={`# ${tag}`} // Corrigido para usar a sintaxe correta de template strings
        description={`Aqui estão todos os textos marcados com a tag # ${tag}`} // Mantém a interpolação correta
      />
      <Header 
        titlePre="Tags" 
      />
      <Breadcrumb />
      <section className={styles.tags_tag_index}>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Datetime date={post.date} semishort={true} />
              <Link href={`/blog/${post.slug}`}>
                <div>{post.title}</div>
                <div className={styles.tag_tag_index_subtitle}>
                  {post.subtitle && post.subtitle.length > 0 ? `${post.subtitle}` : ""}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
