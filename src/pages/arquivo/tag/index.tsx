// pages/tags.tsx

import { GetStaticProps } from "next";
import React from "react";
import styles from "../../../styles/pages.module.css";
import Link from "next/link";
import { getUniqueTags } from "../../../lib/getMDXPosts";
import Header from "../../../components/header";
import Breadcrumb from "../../../components/breadcrumb";
import { formatString } from "../../../lib/formatString";
import ArchiveButton from "../../../components/archiveButton";

interface TagPageProps {
  tags: {
    tag: string;
    frequency: number;
  }[];
}

export const getStaticProps: GetStaticProps<TagPageProps> = async () => {
  
  const tags = getUniqueTags();

  return {
    props: {
      tags,
      ogtitle: "tags | renribsilva", 
      ogdescription: "Veja todas as tags usadas nos textos do nosso blog.", // Exporta a descrição
    },
  };
};

export default function TagsPage({ tags }: TagPageProps) {
  return (
    <>
      <Header titlePre="tags" />
      <Breadcrumb />
      {/* Seção para os botões de tag */}
      <section className={styles.tags_index}>
        <h3>tags</h3>
        <ul className={styles.archive_index_ul}>
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
      </section>
    </>
  );
}
