import Head from "next/head";
import { getSortedPostsData, getPostData, getUniqueTags } from "../../lib/getCollection";
import { PostData } from "../../mdxtypes";
import styles from "../../styles/pages.module.css";
import React from "react";
import Tags from "../../components/tags";
import Link from "next/link";

interface GroupedPosts {
  [tag: string]: {
    frequency: number;
    posts: PostData[];
  };
}

export async function getStaticProps() {
  const postsData = getSortedPostsData();

  const posts = await Promise.all(
    postsData.map(post => getPostData(post.slug))
  );

  // Obtém as tags únicas com frequências
  const uniqueTagsWithFrequency = getUniqueTags();

  // Agrupa os posts por tag
  const groupedPosts: GroupedPosts = uniqueTagsWithFrequency.reduce((acc, { tag, frequency }) => {
    // Filtra os posts que contêm a tag
    const relatedPosts = posts.filter(post => post.tags.includes(tag));
    
    acc[tag] = { frequency, posts: relatedPosts };
    return acc;
  }, {} as GroupedPosts);

  return { props: { groupedPosts } };
}

export default function Page({ groupedPosts }: { groupedPosts: GroupedPosts }): JSX.Element {
  return (
    <>
      <Head>
        <title>Tags | Petricor</title>
      </Head>
      <section className={styles.tags_index}>
        {Object.entries(groupedPosts)
          .sort(([, a], [, b]) => b.frequency - a.frequency) // Ordena as tags pela frequência
          .map(([tag, { posts }]) => (
            <section key={tag}>
              <ul>
                {posts.map(post => (
                  <li key={post.id}>
                    <Link href={`/tags/${tag}/`} legacyBehavior>
                      <a>
                        <Tags tag={tag} />
                      </a>
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