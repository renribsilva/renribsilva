import styles from "../styles/components.module.css";
import Link from "next/link";
import React from "react";
import Mastodon from "./svgs/mastodon";
import Github from "./svgs/github";
import Rss from "./svgs/rss";

const SocialObjects = [
  {
    icon: Mastodon, 
    alt: "ícone do mastodon",
    link: "https://ursal.zone/@renribsilva",
  },
  {
    icon: Github, 
    alt: "ícone do github",
    link: "https://github.com/renribsilva/renribsilva",
  },
  {
    icon: Rss, 
    alt: "ícone de rss",
    link: "https://renribsilva.vercel.app/api/rss.xml",
  },
];

export default function Socials() {
  return (
    <ul className={styles.socials}>
      {SocialObjects.map(({ icon: Icon, link, alt }) => (
        <li key={link}>
          <Link
            target="_blank"
            href={link}
            aria-label={alt}
            rel="noopener noreferrer"
          >
            <Icon />
          </Link>
        </li>
      ))}
    </ul>
  );
}