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

  const toggleNavbar = () => {
    setIsNavbarOpen(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize); 

    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className={ubuntu.className}>
      <div className={styles.navmenu}>
        <Menu toggleNavbar={toggleNavbar} />
        {isMobileView ? (isNavbarOpen ? <Navbar /> : null) : <Navbar />}
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