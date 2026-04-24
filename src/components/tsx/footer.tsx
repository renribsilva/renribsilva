import { useTheme } from "next-themes";
import styles from "./components.module.css"
import LinkExterno from "./link_externo";
import { useEffect, useState } from "react";

export default function Footer() {

  const { resolvedTheme, setTheme } = useTheme();
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <footer className={styles.footer}>
        <div>
          <div>
            <span>
              <LinkExterno href="https://github.com/renribsilva">
                renribsilva
              </LinkExterno>
            </span>
            <span> © {currentYear}</span>
          </div>
          <div>Less, but better.</div>
          <div>
            <span>switch mode: </span>
            <span></span>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className={styles.footer}>
      <div>
        <div>
          <span>
            <LinkExterno href="https://github.com/renribsilva">
              renribsilva
            </LinkExterno>
          </span>
          <span> © {currentYear}</span>
        </div>
        <div>Less, but better.</div>
        <div>
          <span>switch mode: </span>
          {resolvedTheme === "light" ? (
            <span>
              <button
                onClick={toggleTheme}
                aria-label={resolvedTheme === "light" ? "Ativar tema escuro" : "Tema claro ativado"}
                className={styles.dark_button}
              >
                dark
              </button>
            </span>
          ):(
            <span>
              <button
                onClick={toggleTheme}
                aria-label={resolvedTheme === "light" ? "Ativar tema escuro" : "Tema claro ativado"}
                className={styles.light_button}
              >
                light
              </button>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}