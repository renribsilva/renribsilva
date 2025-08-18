import { getPostsByTag, getUniqueTags } from "../../../lib/getMDXPosts";
import { PostData } from "../../../mdxtypes";
import Datetime from "../../../components/datetime";
import styles from "../../../styles/pages.module.css";
import React from "react";
import Link from "next/link";
import { formatString } from "../../../lib/formatString";
import Header from "../../../components/header";
import Breadcrumb from "../../../components/breadcrumb";

export async function getStaticPaths() {
  const tags = getUniqueTags();
  const paths = tags.map(({ tag }) => ({
    params: { tag: formatString(tag) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { tag: string } }) {

  const formattedTag = params.tag;
  const originalTags = getUniqueTags();
  const originalTag = originalTags.find(t => formatString(t.tag) === formattedTag)?.tag;
  const posts = getPostsByTag(originalTag);

  return {
    props: {
      tag: originalTag || "",
      posts,
      ogtitle: `# ${originalTag} | renribsilva`,
      ogdescription: `Explore os posts relacionados à tag # ${originalTag}.`,
    },
  };
}

export default function TagPage({ tag, posts }: { tag: string; posts: PostData[] }) {
  return (
    <>
      <Header 
        titlePre={`# ${tag}`} 
      />
      <Breadcrumb />
      <section className={styles.tags_tag_index}>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Datetime date={post.date} semishort={true} />
              <Link href={`/textos/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
