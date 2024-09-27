import Link from "next/link";
import styles from "../styles/components.module.css";

const currentYear = new Date().getFullYear();

const linkfooter = [
  { label: "nextjs", href: "https://nextjs.org/" },
  { label: "notion", href: "https://www.notion.so/" },
  { label: "typography", href: "https://astro-theme-typography.vercel.app/" },
];

const linkprops = {
  blank: "_blank",
  rel:"noopener noreferrer nofollow"
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p>
          renribsilva © {currentYear}
        </p>
        <p>
          criado com:{" "}
          <Link href={linkfooter[0].href} target={linkprops.blank} rel={linkprops.rel}>
            {linkfooter[0].label}
          </Link>
          {" e "}
          <Link href={linkfooter[1].href} target={linkprops.blank} rel={linkprops.rel}>
            {linkfooter[1].label}
          </Link>
        </p>
        <p>
          layout modelo:{" "}
          <Link href={linkfooter[2].href} target={linkprops.blank} rel={linkprops.rel}>
            {linkfooter[2].label}
          </Link>
        </p>
      </div>
    </footer>
  );
}
