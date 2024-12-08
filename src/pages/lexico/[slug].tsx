import { getNotionPosts } from "../../lib/getNotionPosts";
import { NotionPage } from "../../notiontypes";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "../../styles/pages.module.css";
import Datetime from "../../components/datetime";
import React from "react";
import Header from "../../components/header";
import Breadcrumb from "../../components/breadcrumb";

export const getStaticPaths: GetStaticPaths = async () => {
  const database = await getNotionPosts();

  if (!database || !database.results) {
    return { paths: [], fallback: false };
  }

  const paths = database.results.map((post: NotionPage) => ({
    params: {
      slug: post.properties.Page.title[0].plain_text
        .replace(/\s+/g, "")
        .replace(/-/g, "")
        .toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug } = params!;
  const database = await getNotionPosts();

  if (!database || !database.results) {
    return { notFound: true };
  }

  const post = database.results.find((post: NotionPage) => {

    const postSlug = post.properties.Page.title[0].plain_text
      .replace(/\s+/g, "")
      .replace(/-/g, "")
      .toLowerCase();
    return postSlug === slug;
  });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
      ogtitle: "Léxico | Petricor",
      ogdescription: `Às vezes as palavras significam muito mais do que dizem os verbetes de dicionários. Aqui está o que '${slug}' às vezes significa para mim.`,
    },
    revalidate: 60,
  };
};
 
interface PostProps {
  post: NotionPage;
}

const Post = ({ post }: PostProps) => {
  return (
    <>
      <Header titlePre={post.properties.Page.title[0].plain_text.replace(/-/g, "·")} />
      <Breadcrumb />
      <section className={styles.lexicoslug}>
        <div>
          <h1>{post.properties.Page.title[0].plain_text.replace(/-/g, "·")}</h1>
          <div>
            <span>
              <Datetime date={post.created_time}></Datetime>
            </span>
          </div>
        </div>
        <p>
          {post.properties.Slug.rich_text.map((item) => item.plain_text).join(" ")}
        </p>
      </section>
    </>
  );
};

export default Post;
