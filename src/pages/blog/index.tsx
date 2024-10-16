// pages/blog/index.tsx

import { getSortedPostsData, getPostData } from "../../lib/getMDXPosts"; 
import { PostData } from "../../mdxtypes"; 
import Datetime from "../../components/datetime";
import styles from "../../styles/pages.module.css";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/header";
import Mypagination from "../../components/mypagination";
import Breadcrumb from "../../components/breadcrumb"; // Importando o componente Breadcrumb

interface GroupedPosts {
  [year: string]: PostData[];
}

// Defina o número de posts por página
const POSTS_PER_PAGE = 4;

// Atualizando para usar getServerSideProps
export async function getServerSideProps() {
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
  }, {} as GroupedPosts);

  return {
    props: {
      groupedPosts,
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
            maxButtons={1} // Adiciona a opção maxButtons
          />
        )}
      </section>
    </>
  );
}
