import Link from "next/link";
import styles from "../styles/components.module.css";
import React from "react";

const currentYear = new Date().getFullYear();

const linkfooter = [
  { label: "nextjs", href: "https://nextjs.org/" },
];

const linkProps = {
  target: "_blank",
  rel: "noopener noreferrer"
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>© {currentYear} MIT</div>
      <div>
        criado com:{" "}
        {linkfooter.slice(0, 2).map(({ label, href }) => (
          <React.Fragment key={href}>
            <Link href={href} {...linkProps} rel="noopener noreferrer">
              {label}
            </Link>
          </React.Fragment>
        ))}
      </div>
    </footer>
  );
}
