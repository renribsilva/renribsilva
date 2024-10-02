import Link from "next/link";
import styles from "../styles/components.module.css";
import React from "react";

export default function Petricor () {
  return (
    <header className={styles.petricor}>
      <Link href="/">
        <div>petricor</div>
      </Link>
    </header>
  );
}