// No seu componente Page
import Head from "next/head";
import { getSortedPostsData, getPostData, getUniqueTags } from "../../lib/getMDXPosts";
import { PostData } from "../../mdxtypes";
import styles from "../../styles/pages.module.css";
import React from "react";
import Link from "next/link";
import Tagbutton from "../../components/tagbutton";

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
                    <Link href={`/tags/${tag}/`} aria-label={`Link para textos marcados com #${tag}`} data-transition-name={tag}>
                      {post.tags.map((postTag: string) => (
                        <Tagbutton key={postTag} tag={postTag}> {/* Aqui você passa 'tag' como prop */}
                          # {postTag} {/* Aqui, o valor de 'postTag' é passado como children */}
                        </Tagbutton>
                      ))}
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
