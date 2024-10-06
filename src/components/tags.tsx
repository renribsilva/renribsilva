import React from "react";
import Link from "next/link";
import styles from "../styles/components.module.css";

interface Props {
  tag: string;
}

export default function Tags({ tag }: Props) {
  return (
    <section className={styles.tags_components}>
      <li>
        <Link href={`/tags/${tag}/`} aria-label={`Posts tagged with ${tag}`} data-transition-name={tag}>
          <span>#</span>
          &nbsp;
          <span>{tag}</span>
        </Link>
      </li>
    </section>
  );
}
