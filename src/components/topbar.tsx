import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "../styles/topbar.module.css"

const themeswitch = {
  fasun: faSun,
  famoon: faMoon,
  altsun: "ícone do sol, para definir o tema claro",
  altmoon: "ícone da lua, para definir o tema escuro"
}

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <section className={styles.section}>
      <Link href="/" className={styles.home}>
        <FontAwesomeIcon icon={faHouse} />
      </Link>
      <Link className={styles.theme} href="#" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
        <span>
          <FontAwesomeIcon 
            icon={resolvedTheme === "light" ? themeswitch.famoon : themeswitch.fasun}
            size="xl" />
        </span>
      </Link>
    </section>
  );
}
