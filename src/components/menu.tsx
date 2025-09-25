import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; 
import { useTheme } from "next-themes";
import styles from "../styles/components.module.css";
import Close from "./svgs/close";
import MyBars from "./svgs/bars";
import Dark from "./svgs/dark";
import Light from "./svgs/light";

const menu = [
  { alt: "Ativar tema claro" },
  { alt: "Ativar tema escuro" },
  { alt: "Abrir menu de navegação" },
  { alt: "Fechar menu de navegação" }
];

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
      aria-label={resolvedTheme === "light" ? menu[1].alt : menu[0].alt}
      style={{ cursor: "pointer" }}
      className={styles.menuthemebutton}
    >
      {resolvedTheme === "light" ? (
        <Dark/>
      ) : (
        <Light/>
      )}
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
      {isNavbarOpen ? (
        <Close/>
      ) : (
        <MyBars/>
      )}
    </button>
  );
}

export default function Menu({ toggleNavbar }) {

  const [isShort, setIsShort] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleToggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
    toggleNavbar();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsShort(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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