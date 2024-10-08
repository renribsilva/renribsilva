import styles from "../styles/components.module.css";
import React from "react";

interface TagButtonProps {
  children?: React.ReactNode; // Adiciona children como uma prop opcional
}

export default function Tagbutton ({ children }: TagButtonProps): React.JSX.Element {
  return (
    <button className={styles.default_button}>{children}</button>
  );
};