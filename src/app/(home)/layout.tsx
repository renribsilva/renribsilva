'use client'

import AppHeader from "../../components/tsx/header";
import AppSidebar from "../../components/tsx/sidebar";
import { useSidebar } from "../../context/sidebar_provider";
import styles from "./home.module.css"

export default function RootLayout({ children }) {

  const { isMobile, isMobileOpen, toggleMobileSidebar } = useSidebar();

  return (
    <section>
      <div className={styles.home_up}>
        <AppHeader/>
      </div>
      <div className={styles.home_down}>
        {isMobile && (
          <div 
            className={`${styles.backdrop} ${isMobileOpen ? styles.backdrop_active : ""}`}
            onClick={toggleMobileSidebar}
          />
        )}
        {/* No Desktop, ele fica aqui dentro. No Mobile, o AppSidebar é fixed e o container some */}
        <div className={styles.home_left}>
          {!isMobile && <AppSidebar />}
        </div>
        {/* Se for mobile, renderiza fora do container que tem min-width */}
        {isMobile && <AppSidebar />}
        <div className={styles.home_right}>
          {children}
        </div>
      </div>
    </section>

  )
}