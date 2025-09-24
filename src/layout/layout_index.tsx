import { useState, useEffect } from "react";
import Footer from "../components/footer";
import Menu from "../components/menu";
import Navbar from "../components/navbar";
import styles from "../styles/layout.module.css";
import PropTypes from "prop-types";
import React from "react";
import Socials from "../components/socials";
import { Ubuntu } from "next/font/google";

LayoutIndex.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: "300"
});

export default function LayoutIndex({ children }) {

  const [isNavbarOpen, setIsNavbarOpen] = useState(false); 
  const [isMobileView, setIsMobileView] = useState(false); 
  const [mounted, setMounted] = useState(false); 

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 600); // Define 600px como o ponto de corte para mobile
    };

    handleResize();
    window.addEventListener("resize", handleResize); 

    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(prev => !prev);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className={ubuntu.className}>
      <div className={styles.navmenu}>
        <div>
          <Menu toggleNavbar={toggleNavbar} />
        </div>
        <div>
          {isMobileView ? (isNavbarOpen ? <Navbar /> : null) : <Navbar />}
        </div>
      </div>
      {/* <Myhr marginTop="0px"/> */}
      <main className={styles.layout_main}>{children}</main>
      {/* <Myhr /> */}
      <Socials />
      <Footer />
      <div className={styles.layout_rodape}></div>
    </section>
  );
}