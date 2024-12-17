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
      ogtitle: "anos | renribsilva", 
      ogdescription: "Veja os textos agrupados por ano.", // Exporta a descrição
    },
  };
};

export default function TagsPage({ years }: TagPageProps) {
  return (
    <>
      <Header titlePre="anos" />
      <Breadcrumb />      
      {/* Seção para os botões de ano */}
      <section>
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
    </>
  );
}
