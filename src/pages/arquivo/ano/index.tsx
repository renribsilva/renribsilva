// pages/tags.tsx

import { GetStaticProps } from "next";
import React from "react";
import Link from "next/link";
import { getPostsGroupedByYear } from "../../../lib/getMDXPosts";
import Header from "../../../components/header";
import Breadcrumb from "../../../components/breadcrumb";
import ArchiveButton from "../../../components/archiveButton";
import styles from "../../../styles/pages.module.css";

interface TagPageProps {
  years: string[];
}

export const getStaticProps: GetStaticProps<TagPageProps> = async () => {
  
  const groupedByYear = getPostsGroupedByYear();
  const years = Object.keys(groupedByYear);

  return {
    props: {
      years,
      ogtitle: "tags | renribsilva", 
      ogdescription: "Veja todas as tags usadas nos textos do nosso blog.", // Exporta a descrição
    },
  };
};

export default function TagsPage({ years }: TagPageProps) {
  return (
    <>
      <Header titlePre="tags" />
      <Breadcrumb />      
      {/* Seção para os botões de ano */}
      <section className={styles.tags_index}>
        <h3>anos</h3>
        <ul className={styles.archive_index_ul}>
          {years.map((year) => (
            <li key={year}>
              <Link href={`/arquivo/ano/${year}`} legacyBehavior>
                <ArchiveButton>{year}</ArchiveButton>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Seção para os botões de tag */}
      {/* <section className={styles.tags_index}>
        <h3>Tags</h3>
        <ul>
          {tags
            .sort((a, b) => b.frequency - a.frequency) // Ordena por frequência
            .map(({ tag, frequency }) => {
              const formattedTag = formatString(tag); // Formata a tag
              return (
                <li key={formattedTag}>
                  <Link href={`/arquivo/tag/${formattedTag}`} legacyBehavior>
                    <ArchiveButton># {tag} ({frequency})</ArchiveButton>
                  </Link>
                </li>
              );
            })}
        </ul>
      </section> */}
    </>
  );
}
