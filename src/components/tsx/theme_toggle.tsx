'use client'

import { useTheme } from "next-themes";
import styles from "./components.module.css";
import Dark from "../svg/dark";
import Light from "../svg/light";
import { useEffect, useState } from "react";
import System from "../svg/system";

function Theme() {
  
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={resolvedTheme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
      className={`${styles.theme_button} ${styles.theme_switch} ${resolvedTheme === "dark" ? styles.theme_switch_dark : ""}`}
    >
      <div className={styles.theme_switch_container}>
        <div className={`${resolvedTheme === "light" ? styles.theme_switch_icon_active : styles.theme_switch_icon_inactive}`}>
          <Light />
        </div>
        <div className={`${resolvedTheme === "dark" ? styles.theme_switch_icon_active : styles.theme_switch_icon_inactive}`}>
          <Dark />
        </div>
        {/* <div className={`${styles.theme_switch_icon_system} ${resolvedTheme === "system" ? styles.theme_switch_icon_active : styles.theme_switch_icon_inactive}`}>
          <System />  
        </div> */}
      </div>
    </button>
  );
}

export default Theme;
