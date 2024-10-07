import Head from "next/head";
import { getSortedPostsData, getPostData } from "../../lib/getMDXPosts"; 
import { PostData } from "../../mdxtypes"; 
import Datetime from "../../components/datetime";
import styles from "../../styles/pages.module.css";
import React from "react";
import Link from "next/link";

interface GroupedPosts {
  [year: string]: PostData[];
}

export async function getStaticProps() {
  const postsData = getSortedPostsData();
  
  const posts = await Promise.all(
    postsData.map(async (post) => await getPostData(post.slug))
  );

  const groupedPosts: GroupedPosts = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as GroupedPosts); // Garante que o acumulador é do tipo GroupedPosts

  return {
    props: {
      groupedPosts,
    },
  };
}

export default function Page({ groupedPosts }: { groupedPosts: GroupedPosts }) {
  return (
    <>
      <Head>
        <title>Blog | Petricor</title>
      </Head>
      <section className={styles.blog_index}>
        {Object.entries(groupedPosts)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)) // Ordena os anos em ordem decrescente
          .map(([year, posts]) => (
            <section key={year}>
              <h3>{year}</h3>
              <ul>
                {posts.map(post => (
                  <li key={post.id}>
                    <Datetime
                      date={post.date}
                      short={true}
                    />
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                      {post.subtitle && post.subtitle.length > 0 ? `: ${post.subtitle}` : ""}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
        ))}
      </section>
    </>
  );
}
