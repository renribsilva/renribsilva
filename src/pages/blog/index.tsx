import { getSortedPostsData, getPostData } from "../../lib/getMDXPosts";
import { PostData } from "../../mdxtypes";
import Datetime from "../../components/datetime";
import styles from "../../styles/pages.module.css";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/header";
import Mypagination from "../../components/mypagination";
import Breadcrumb from "../../components/breadcrumb";

interface GroupedPosts {
  [year: string]: PostData[];
}

const POSTS_PER_PAGE = 4;

export async function getStaticProps() {
  // Obtendo os dados dos posts
  const postsData = getSortedPostsData();
  const posts = await Promise.all(
    postsData.map(async (post) => await getPostData(post.slug))
  );

  // Agrupando os posts por ano
  const groupedPosts: GroupedPosts = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as GroupedPosts);

  return {
    props: {
      groupedPosts,
      title: "Blog | Petricor", 
      description: "Explore os artigos e atualizações mais recentes do nosso blog.", 
    },
  };
}

export default function Blog({ groupedPosts }: { groupedPosts: GroupedPosts }) {
  const allPosts = Object.values(groupedPosts).flat();
  const [currentPage, setCurrentPage] = useState(1);

  // Calcule o número total de páginas
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  // Determine os posts da página atual
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <>
      <Header titlePre="Blog" />
      <Breadcrumb />
      <section className={styles.blog_index}>
        <ul>
          {currentPosts.map((post) => (
            <li key={post.id}>
              <Datetime date={post.date} short={true} />
              <Link href={`/blog/${post.slug}`}>
                <div>{post.title}</div>
                <div className={styles.blog_index_subtitle}>
                  {post.subtitle && post.subtitle.length > 0 ? `${post.subtitle}` : ""}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Condiciona a renderização da paginação */}
        {totalPages > 1 && (
          <Mypagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            maxButtons={1}
          />
        )}
      </section>
    </>
  );
}
