// pages/arquivo/[ano].tsx

import { GetStaticProps } from "next";
import Link from "next/link";
import { getPostsByYear } from "../../../lib/getMDXPosts";
import { PostData } from "../../../mdxtypes";
import Header from "../../../components/header";
import Breadcrumb from "../../../components/breadcrumb";
import React from "react";
import styles from "../../../styles/pages.module.css";
import Datetime from "../../../components/datetime";

interface YearPageProps {
  ano: string;
  posts: PostData[];
}

export const getStaticProps: GetStaticProps<YearPageProps> = async ({ params }) => {
  const ano = params!.ano as string;
  const posts = getPostsByYear(ano);  // Busca os posts por ano

  return {
    props: {
      ano,
      posts,
    },
  };
};

export const getStaticPaths = async () => {
  const anos = ["2023", "2024"]; // Exemplo, você vai preencher isso dinamicamente com seus anos
  const paths = anos.map(ano => ({ params: { ano } }));

  return {
    paths,
    fallback: false,
  };
};

const YearPage = ({ ano, posts }: YearPageProps) => {
  return (
    <>
      <Header titlePre={`Posts de ${ano}`} />
      <Breadcrumb />
      <section className={styles.tags_tag_index}>
        {/* <h1>Posts de {ano}</h1>  */}
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Datetime date={post.date} semishort={true} />
              <Link href={`/textos/${post.slug}`} legacyBehavior>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default YearPage;
