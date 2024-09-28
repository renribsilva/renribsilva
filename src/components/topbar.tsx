import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "../styles/components.module.css";
import React from "react";

// Objeto com as configurações da topbar
const topbar = {
  fasun: faSun,
  famoon: faMoon,
  altsun: "ícone do sol, para definir o tema claro",
  altmoon: "ícone da lua, para definir o tema escuro",
};

export default function Topbar () {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Alterna entre tema claro e escuro
  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <section>
      {/* Link para a home */}
      <div className={styles.topbar}>
        <div className={styles.topbar_home}>
          <Link href="/" aria-label="Página inicial">
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </div>
        <div className={styles.topbar_theme}>
          <Link
            href="#"
            onClick={toggleTheme}
            style={{ cursor: "pointer" }}
            aria-label={resolvedTheme === "light" ? topbar.altmoon : topbar.altsun}
          >
            <span>
              <FontAwesomeIcon
                icon={resolvedTheme === "light" ? topbar.famoon : topbar.fasun}
                size="xl"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
