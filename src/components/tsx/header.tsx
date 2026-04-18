'use client';

import React from "react";
import styles from "./components.module.css";
import Theme from "./theme_toggle";
import GithubLink from "./github_link";
import { useSidebar } from "../../context/sidebar_context";
import MenuButton from "./menu_button";

const AppHeader: React.FC = () => {

  const { isMobile } = useSidebar();

  return (
    <section className={styles.appheader_container}>
      <div>
        {isMobile && (
          <MenuButton  />
        )}
      </div>
      <div className={styles.appheader_links}>
        <Theme />
        <GithubLink />
      </div>
    </section>
  );
};

export default AppHeader;