// pages/arquivo/[ano].tsx

import { GetStaticProps } from "next";
import Link from "next/link";
import { getPostsByYear, getUniqueYears } from "../../../lib/getMDXPosts";
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
      ogtitle: `${ano} | renribsilva`, 
      ogdescription: `Todos os textos publicados em ${ano}`, // Exporta a descrição
    },
  };
};

export const getStaticPaths = async () => {

  const anos = await getUniqueYears();  
  const paths = anos.map(ano => ({ params: { ano } }));
  console.log(anos);
  return {
    paths,
    fallback: false,
  };
};

const YearPage = ({ ano, posts }: YearPageProps) => {
  return (
    <>
      <Header titlePre={`${ano}`} />
      <Breadcrumb />
      <section className={styles.tags_tag_index}>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Datetime date={post.date} semishort={true} />
              <Link href={`/textos/${post.slug}`}>
                {post.title.replace("/·/g", "")}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default YearPage;
