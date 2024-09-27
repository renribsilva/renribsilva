import { useState, useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Menu from "../components/menu";
import Navbar from "../components/navbar";
import Socials from "../components/socials";
import Topbar from "../components/topbar";
import styles from "../styles/layout.module.css";
import Myhr from "../components/myhr";

export default function LayoutIndex({ children }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // Estado para controlar o Navbar
  const [isMobileView, setIsMobileView] = useState(false); // Estado para detectar largura da tela

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

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen); // Alterna entre expandir/recolher o Navbar
  };

  return (
    <>
      <div>
        <Topbar />
        <section className={styles.layout_i}>
          <main className={styles.li_main}>
            {children}
            <Myhr />
          </main>
          <div className={styles.li_space}></div>
          <div>
            <div className={styles.li_header_menu}>
              <span className={styles.lihn_header}><Header /></span>
              <span className={styles.lihn_menu}><Menu toggleNavbar={toggleNavbar} /></span>
            </div>
            {/* Renderiza o Navbar condicionalmente apenas em mobile view */}
            {isMobileView ? (
              isNavbarOpen && (
                <div className={styles.li_navbar}>
                  <span className={styles.lin_navbar}><Navbar /></span>
                </div>
              )
            ) : (
              <div className={styles.li_navbar}>
                <span className={styles.lin_navbar}><Navbar /></span>
              </div>
            )}
            <Myhr />
          </div>
          <div className={styles.li_socials_footer}>
            <span className={styles.lisf_socials}><Socials /></span>
            <span className={styles.lisf_footer}><Footer /></span>
          </div>
        </section>
      </div>
    </>
  );
}
