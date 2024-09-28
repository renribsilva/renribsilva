import Link from "next/link";
import styles from "../styles/components.module.css";
import React from "react";

const navItems: { label: string; page?: string }[] = [
  { label: "/textos", page: "/textos" }, 
  { label: "/rechetegues ", page: "/rechetegues" },
  { label: "/léxico", page: "/lexico" },
  { label: "/sobre", page: "/sobre" },
];

export default function Navbar () {
  return (
    <nav className={styles.navbar}>
      <ul>
        {navItems.map(({ label, page }) => (
          <li key={label}>
            <Link href={page}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}