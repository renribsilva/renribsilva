import { ReactNode } from "react";
import styles from "../styles/components.module.css"

interface Texts {
  h1Text?: string; // Torna h1Text opcional
  h2Text?: ReactNode; // Torna h2Text opcional
}

export default function Titles({ h1Text = '', h2Text = '' }: Texts): JSX.Element {
  return (
    <div className={styles.titles}>
      <h1>{h1Text}</h1>
      <h2>{h2Text}</h2>
    </div>
  );
}
