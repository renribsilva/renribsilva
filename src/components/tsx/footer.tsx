import styles from "./components.module.css"
import LinkExterno from "./link_externo";
import Theme from "./theme_toggle";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <div>GPLv3 © {currentYear}</div>
        <div>Less, but better.</div>
        <div>
          <span>by </span>
          <span>
            <LinkExterno href="https://github.com/renribsilva">
              renribsilva
            </LinkExterno>
          </span>
        </div>
      </div>
      <div>
        <Theme />
      </div>
    </footer>
  );
}