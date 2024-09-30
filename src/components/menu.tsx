import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "../styles/components.module.css";

const topbar = [
  { ícone: faSun, alt: "ícone do sol, um link para definir o tema claro" },
  { ícone: faMoon, alt: "ícone da lua, um link para definir o tema escuro" },
  { ícone: faBars, alt: "ícone de barras, um link que expande uma seção de navegação" },
  { ícone: faHouse, alt: "ícone de casa, um link que envia para a página inicial" }
];

function Theme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
    <div>
      <Link
        href="#"
        onClick={toggleTheme}
        style={{ cursor: "pointer" }}
        aria-label={resolvedTheme === "light" ? topbar[1].alt : topbar[0].alt}
      >
        <span className={styles.menu_theme_icon}>
          <FontAwesomeIcon
            icon={resolvedTheme === "light" ? topbar[1].ícone : topbar[0].ícone}
            size="xl"
          />
        </span>
      </Link>
    </div>
  );
}

function Bars({ toggleNavbar }) {
  return (
    <div>
      <span
        onClick={toggleNavbar}
        style={{ cursor: "pointer" }}
        aria-label={topbar[2].alt}
        className={styles.menu_bars_icon}
      >
        <FontAwesomeIcon icon={topbar[2].ícone} size="xl" />
      </span>
    </div>
  );
}

export default function Menu({ toggleNavbar }) {
  const [isShort, setIsShort] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsShort(window.innerWidth < 1080);
    };

    handleResize(); // Verifica o tamanho da tela ao montar
    window.addEventListener("resize", handleResize); // Adiciona listener de resize

    return () => window.removeEventListener("resize", handleResize); // Remove o listener ao desmontar
  }, []);

  return (
    <section className={styles.menu}>
      {isShort ? (
        <>
          <Theme />
          <Bars toggleNavbar={toggleNavbar} />
        </>
      ) : (
        <>
          <Theme />
        </>
      )}
    </section>
  );
}

// Validação de props para Menu
Menu.propTypes = {
  toggleNavbar: PropTypes.func.isRequired, 
};

// Validação de props para Bars
Bars.propTypes = {
  toggleNavbar: PropTypes.func.isRequired, 
};
