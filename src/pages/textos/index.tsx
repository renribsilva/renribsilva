import { getSortedPostsData } from "../../lib/getMDXPosts";
import { PostData } from "../../mdxtypes";
import Datetime from "../../components/datetime";
import styles from "../../styles/pages.module.css";
import React from "react";
import Link from "next/link";
import Header from "../../components/header";
// import Mypagination from "../../components/mypagination";
import Breadcrumb from "../../components/breadcrumb";

interface GroupedPosts {
  [year: string]: PostData[];
}

export async function getStaticProps() {

  const postsData = getSortedPostsData();

  const groupedPosts: GroupedPosts = postsData.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as GroupedPosts);

  return {
    props: {
      groupedPosts: groupedPosts,
      ogtitle: "textos | renribsilva",
      ogdescription: "Explore os textos e atualizações mais recentes.",
    },
  };
}

export default function Textos({ groupedPosts }: { groupedPosts: GroupedPosts }) {
  
  const allPosts = Object.values(groupedPosts)
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); 

  return (
    <>
      <Header titlePre="textos" />
      <Breadcrumb />
      <section className={styles.blog_index}>
        <ul>
          {allPosts.map((post) => (
            <li key={post.id}>
              <Datetime date={post.date} semishort={true} />
              <Link href={`/textos/${post.slug}`}>
                <div>{post.title.replace(/·/g, "")}</div>
                <div className={styles.blog_index_subtitle}>
                  {post.subtitle && post.subtitle.length > 0 ? `${post.subtitle}` : ""}
                </div>
              </Link>
            </li>
          ))}
        </ul> 
      </section>
    </>
  );
}
