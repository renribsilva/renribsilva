import styles from "./components.module.css"
import Theme from "./theme_toggle";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <div>GPLv3 © {currentYear}</div>
        <div>Less, but better.</div>
        <div>by renribsilva</div>
      </div>
      <div>
        <Theme />
      </div>
    </footer>
  );
}