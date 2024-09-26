import Sidebar from "./sidebar"
import styles from "../styles/layout.module.css"
import ThemeSwitch from "../components/topbar"
import Footer from "../components/footer"

export default function Layout({ children }) {
  return (
    <>
      <ThemeSwitch />
      <section className={styles.section}>
        <main className={styles.main}>{children}</main>
        <div className={styles.space}></div>
        <div className={styles.sidebar}><Sidebar /></div>
        <div className={styles.footer}><Footer /></div>
      </section>
    </>
  )
}