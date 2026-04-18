'use client'

import Github from "../svg/github";
import LinkExterno from "./link_externo";
import styles from "./components.module.css"

function GithubLink() {

  return (
    <div className={styles.github_link}>
      <LinkExterno href="https://github.com/renribsilva/renribsilva">
        <Github />
      </LinkExterno>
    </div>
  );
}

export default GithubLink;
