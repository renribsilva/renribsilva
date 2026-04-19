'use client';

import React from "react";
import styles from "./components.module.css";
import MenuButton from "./menu_button";
import { useSidebar } from "../../context/sidebar_provider";

const AppHeader: React.FC = () => {

  const { isMobile } = useSidebar();

  return (
    <section className={styles.appheader_container}>
      <div>
        {isMobile && (
          <MenuButton  />
        )}
      </div>
    </section>
  );
};

export default AppHeader;