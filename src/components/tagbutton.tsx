import styles from "../styles/components.module.css";
import React from "react";

interface TagButtonProps {
  children?: React.ReactNode; 
}

export default function Tagbutton ({ children }: TagButtonProps): React.JSX.Element {
  return (
    <button className={styles.default_button}>{children}</button>
  );
};