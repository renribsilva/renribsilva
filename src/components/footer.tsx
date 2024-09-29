import Link from "next/link";
import styles from "../styles/components.module.css";
import React from "react";

const currentYear = new Date().getFullYear();

const linkfooter = [
  { label: "nextjs", href: "https://nextjs.org/" },
  { label: "notion", href: "https://www.notion.so/" },
  { label: "typography", href: "https://astro-theme-typography.vercel.app/" },
];

const linkProps = {
  target: "_blank",
  rel: "noopener noreferrer nofollow"
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p>renribsilva © {currentYear}</p>
        <p>
          criado com:{" "}
          {linkfooter.slice(0, 2).map(({ label, href }, index) => (
            <React.Fragment key={href}>
              <Link href={href} {...linkProps}>
                {label}
              </Link>
              {index < 1 && " e "} {/* Adiciona " e " entre os links */}
            </React.Fragment>
          ))}
        </p>
        <p>
          layout modelo:{" "}
          <Link href={linkfooter[2].href} {...linkProps}>
            {linkfooter[2].label}
          </Link>
        </p>
      </div>
    </footer>
  );
}
