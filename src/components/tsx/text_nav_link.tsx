'use client'

import Link from "next/link";
import styles from "./components.module.css";

type Direction = "prev" | "next";

interface TextNavLinkProps {
  href: string;
  ariaLabel: string;
  direction: Direction;
}

export default function TextNavLink({ href, ariaLabel, direction }: TextNavLinkProps) {
  const icon = direction === "next" ? "→" : "←";
  const linkClass = direction === "next" ? styles.next_nav_link : styles.prev_nav_link;

  return (
    <Link href={href} className={`${styles.text_nav_link} ${linkClass}`} aria-label={ariaLabel}>
      <span aria-hidden="true" className={styles.text_nav_icon}>
        {icon}
      </span>
    </Link>
  );
}
