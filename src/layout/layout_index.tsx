import { useState, useEffect } from "react";
import Footer from "../components/footer";
import Menu from "../components/menu";
import Navbar from "../components/navbar";
import Socials from "../components/socials";
import styles from "../styles/layout.module.css";
import Myhr from "../components/myhr";
import PropTypes from "prop-types";
import React from "react";
import Petricor from "../components/petricor";

LayoutIndex.propTypes = {
  children: PropTypes.node.isRequired, // Adiciona validação para 'children'
};

export default function LayoutIndex({ children }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // Estado para controlar o Navbar
  const [isMobileView, setIsMobileView] = useState(false); // Estado para detectar largura da tela
  const [mounted, setMounted] = useState(false); // Estado para controlar se o componente está montado

  // Verifica o tamanho da janela e define se é mobile ou não
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1080); // Define 1080px como o ponto de corte para mobile
    };

    handleResize(); // Executa ao carregar
    window.addEventListener("resize", handleResize); // Adiciona o listener para mudanças no tamanho da janela

    return () => {
      window.removeEventListener("resize", handleResize); // Remove o listener ao desmontar o componente
    };
  }, []);

  // Verifica se o componente foi montado
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(prev => !prev); // Alterna entre expandir/recolher o Navbar
  };

  // Evita renderizar o navbar se o componente não estiver montado
  if (!mounted) {
    return null;
  }

  return (
    <section className={styles.layout_i}>
      <main className={styles.li_main}>
        {children}
        <Myhr />
      </main>
      <div className={styles.li_space}></div>
      <div>
        <div className={styles.li_header_menu}>
          <Petricor />
          <Menu toggleNavbar={toggleNavbar} />
        </div>
        <div className={styles.li_navbar}>
          {isMobileView ? (isNavbarOpen ? <Navbar /> : null) : <Navbar />}
        </div>
        <Myhr marginTop="15px"/>
      </div>
      <div className={styles.li_socials_footer}>
        <Socials />
        <Footer />
      </div>
    </section>
  );
}