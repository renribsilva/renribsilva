import { useState, useEffect } from "react";
import Footer from "../components/footer";
import Menu from "../components/menu";
import Navbar from "../components/navbar";
import styles from "../styles/layout.module.css";
import Myhr from "../components/myhr";
import PropTypes from "prop-types";
import React from "react";
import Socials from "../components/socials";

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
      setIsMobileView(window.innerWidth <= 600); // Define 600px como o ponto de corte para mobile
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
    <section>
      <div className={styles.navmenu}>
        <div>
          <Menu toggleNavbar={toggleNavbar} />
        </div>
        <div>
          {isMobileView ? (isNavbarOpen ? <Navbar /> : null) : <Navbar />}
        </div>
      </div>
      <Myhr marginTop="0px"/>
        <main>{children}</main>
      <Myhr />
      <Socials />
      <Footer />
      <div className={styles.layout_rodape}></div>
    </section>
  );
}