import styles from "../styles/components.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMastodon, faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import React from "react";
import { faRss } from "@fortawesome/free-solid-svg-icons";

const SocialObjects = [
  {
    ícone: faMastodon, 
    alt: "ícone do mastodon",
    link: "https://ursal.zone/@renribsilva",
  },
  {
    ícone: faGithub, 
    alt: "ícone do github",
    link: "https://github.com/renribsilva/petricor",
  },
  {
    ícone: faRss, 
    alt: "ícone de rss",
    link: "https://petricor.xyz/api/rss.xml",
  },
];

export default function Socials () {
  return (
    <ul className={styles.socials}>
      {SocialObjects.map(({ ícone, link, alt }) => {
        return (
          <li key={link}>
            <Link target="_blank" href={link} aria-label={alt} rel="noopener noreferrer">
              <FontAwesomeIcon icon={ícone}/>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}