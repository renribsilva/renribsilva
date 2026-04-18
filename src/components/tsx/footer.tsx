import styles from "./components.module.css"

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>GPLv3 © {currentYear}</div>
      <div>Less, but better.</div>
      <div>by renribsilva</div>
    </footer>
  );
}