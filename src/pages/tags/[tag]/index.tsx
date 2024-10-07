import Head from "next/head";
import { getPostsByTag, getUniqueTags } from "../../../lib/getMDXPosts";
import { PostData } from "../../../mdxtypes";
import Datetime from "../../../components/datetime";
import styles from "../../../styles/pages.module.css";
import React from "react";
import Link from "next/link";

export async function getStaticPaths() {
  const tags = getUniqueTags();
  const paths = tags.map(({ tag }) => ({ params: { tag } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag);

  return {
    props: {
      tag: params.tag,
      posts,
    },
  };
}

export default function TagPage({ tag, posts }: { tag: string; posts: PostData[] }) {
  return (
    <>
      <Head>
        <title>Posts tagged with {tag}</title>
      </Head>
      <section className={styles.tags_tag_index}>
        <h1># {tag}</h1>
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
