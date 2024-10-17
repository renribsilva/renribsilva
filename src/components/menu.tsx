import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import { useTheme } from "next-themes";
import styles from "../styles/components.module.css";

const menu = [
  { icon: "sunny", alt: "Ativar tema claro" },
  { icon: "dark_mode", alt: "Ativar tema escuro" },
  { icon: "menu", alt: "Abrir menu de navegação" },
  { icon: "close", alt: "Fechar menu de navegação" }
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
    <button
      onClick={toggleTheme}
      aria-label={resolvedTheme === "light" ? menu[1].alt : menu[0].alt}
      style={{ cursor: "pointer" }}
      className={styles.menuthemebutton}
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        {resolvedTheme === "light" ? menu[1].icon : menu[0].icon}
      </span>
    </button>
  );
}

function Bars({ isNavbarOpen, toggleNavbar }) {
  return (
    <button
      onClick={toggleNavbar}
      style={{ cursor: "pointer" }}
      aria-label={isNavbarOpen ? menu[3].alt : menu[2].alt}
      className={styles.menubarsbutton}
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        {isNavbarOpen ? menu[3].icon : menu[2].icon}
      </span>
    </button>
  );
}

export default function Menu({ toggleNavbar }) {
  const [isShort, setIsShort] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleToggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
    toggleNavbar();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsShort(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.menu}>
      {isShort ? (
        <>
          <Bars isNavbarOpen={isNavbarOpen} toggleNavbar={handleToggleNavbar} />
          <Theme />
        </>
      ) : (
        <Theme />
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
  isNavbarOpen: PropTypes.bool.isRequired,
  toggleNavbar: PropTypes.func.isRequired, 
};
