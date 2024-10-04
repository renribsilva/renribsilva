import Head from "next/head";
import { getNotionPosts } from "../../lib/getNotionPosts";
import Link from "next/link";
import { NotionPage } from "../../notiontypes";
import styles from "../../styles/pages.module.css";
import React from "react";

// Tipando o retorno da função getStaticProps
export const getStaticProps = async () => {
  const database = await getNotionPosts(); // Obtendo os posts do Notion

  return {
    props: {
      posts: database.results, // posts é do tipo NotionPage[]
    },
  };
};

// Tipando as props do componente Posts
interface PostsProps {
  posts: NotionPage[]; // posts é um array de NotionPage
}

export default function Posts({ posts }: PostsProps) { // Adicionando a tipagem ao componente
  return (
    <>
      <Head>
        <title>Léxico | Petricor</title>
      </Head>
      <section className={styles.lexico}>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link href={`/lexico/${post.properties.Page.title[0].plain_text.toLowerCase().replace(/-/g, "")}`}>
                <div className={styles.word}>
                  {post.properties.Page.title[0].plain_text.replace(/-/g, "·")}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
