import Link from "next/link";
import styles from "../styles/components.module.css";
import React from "react";

const navItems: { label: string; page?: string }[] = [
  { label: "início", page: "/" }, 
  { label: "textos", page: "/textos" }, 
  { label: "arquivo", page: "/arquivo" },
  // { label: "léxico", page: "/lexico" },
  { label: "projetos", page: "/projetos" },
  { label: "sobre", page: "/sobre" },
];

export default function Navbar () {
  return (
    <div className={styles.navbar}>
      <ul>
        {navItems.map(({ label, page }) => (
          <li key={label}>
            <Link href={page} >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}