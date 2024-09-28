import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "../styles/components.module.css";

const topbar = {
  fasun: faSun,
  famoon: faMoon,
  fabars: faBars,
  altsun: "ícone do sol, para definir o tema claro",
  altmoon: "ícone da lua, para definir o tema escuro",
  altbars: "ícone de barras, que expande uma seção de navegação"
};

export default function Menu({ toggleNavbar }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

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
    <section>
      <div className={styles.menu}>
        <div className={styles.menu_theme}>
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
        <div className={styles.menu_bars}>
          <span
            onClick={toggleNavbar}
            style={{ cursor: "pointer" }}
            aria-label={topbar.altbars}
          >
            <FontAwesomeIcon icon={topbar.fabars} size="xl" />
          </span>
        </div>
      </div>
    </section>
  );
}

// Validação de props
Menu.propTypes = {
  toggleNavbar: PropTypes.func.isRequired, // Adiciona validação para toggleNavbar
};
