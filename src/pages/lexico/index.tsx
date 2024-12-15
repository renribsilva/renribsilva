import { getNotionPosts } from "../../lib/getNotionPosts";
import Link from "next/link";
import { NotionPage } from "../../notiontypes";
import styles from "../../styles/pages.module.css";
import React from "react";
import Header from "../../components/header";
import Breadcrumb from "../../components/breadcrumb";

// Tipando o retorno da função getStaticProps
export const getStaticProps = async () => {
  const database = await getNotionPosts(); // Obtendo os posts do Notion

  return {
    props: {
      posts: database.results, // posts é do tipo NotionPage[]
      ogtitle: "léxico | renribsilva", // Exporta o título com #
      ogdescription: "Conheça todas as palavras que foram ressignificadas neste blog."
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
      <Header titlePre="léxico"/>
      <Breadcrumb />
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
