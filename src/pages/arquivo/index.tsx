import { GetStaticProps } from "next";
import { getUniqueTags, getPostsGroupedByYear } from "../../lib/getMDXPosts";
import React from "react";
import { formatString } from "../../lib/formatString"; 
import styles from "../../styles/pages.module.css";
import Header from "../../components/header";
import Breadcrumb from "../../components/breadcrumb";
import ArchiveButton from "../../components/archiveButton";
import Link from "next/link";

interface TagPageProps {
  tags: {
    tag: string;
    frequency: number;
  }[];
  years: string[]; // Array de anos
}

export const getStaticProps: GetStaticProps<TagPageProps> = async () => {
  const tags = getUniqueTags();
  const groupedByYear = getPostsGroupedByYear();
  const years = Object.keys(groupedByYear); // Obtém os anos disponíveis

  return {
    props: {
      tags,
      years,
      ogtitle: "tags | renribsilva", 
      ogdescription: "Veja todas as tags usadas nos textos do nosso blog.", // Exporta a descrição
    },
  };
};

export default function TagsPage({ tags, years }: TagPageProps) {
  return (
    <>
      <Header titlePre="tags" />
      <Breadcrumb />      
      {/* Seção para os botões de ano */}
      <section>
        <h3>
          <a href="/arquivo/ano">por ano</a>
        </h3>
        <ul className={styles.archive_index_ul}>
          {years.map((year) => (
            <li key={year}>
              <Link href={`/arquivo/ano/${year}`} >
                <ArchiveButton>{year}</ArchiveButton>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Seção para os botões de tag */}
      <section className={styles.archive_index}>
        <h3>
          <a href="/arquivo/tag">por tag</a>
          </h3>
          <ul className={styles.archive_index_ul}>
          {tags
            .sort((a, b) => b.frequency - a.frequency) // Ordena por frequência
            .map(({ tag, frequency }) => {
              const formattedTag = formatString(tag); // Formata a tag
              return (
                <li key={formattedTag}>
                  <Link href={`/arquivo/tag/${formattedTag}`} >
                    <ArchiveButton># {tag} ({frequency})</ArchiveButton>
                  </Link>
                </li>
              );
            })}
        </ul>
      </section>
    </>
  );
}
