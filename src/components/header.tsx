import Link from "next/link";
import styles from "../styles/components.module.css";
import React from "react";

export default function Header () {
  return (
    <header className={styles.header}>
      <Link href="/">
        <div>petricor</div>
      </Link>
    </header>
  );
}