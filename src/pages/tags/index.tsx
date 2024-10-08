// pages/tags/index.tsx
import { GetStaticProps } from "next";
import Link from "next/link";
import { getUniqueTags } from "../../lib/getMDXPosts";
import React from "react";
import Tagbutton from "../../components/tagbutton";
import { formatString } from "../../lib/formatString"; 
import styles from "../../styles/pages.module.css";

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
    },
  };
};

export default function TagsPage({ tags }: TagPageProps) {
  return (
    <section className={styles.tags_index}>
      <ul>
        {tags
          .sort((a, b) => b.frequency - a.frequency) // Ordena por frequência
          .map(({ tag, frequency }) => {
            const formattedTag = formatString(tag); // Formata o tag
            return (
              <li key={formattedTag}> {/* Usa a tag formatada como chave */}
                <Link href={`/tags/${formattedTag}`}>
                  <Tagbutton>
                    #{tag} ({frequency})
                  </Tagbutton>
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
