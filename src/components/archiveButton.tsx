// components/archiveButton.tsx
import styles from "../styles/components.module.css";
import React from "react";

interface TagButtonProps {
  children?: React.ReactNode;
  onClick?: () => void; // Adiciona a propriedade onClick
}

export default function ArchiveButton({ children, onClick }: TagButtonProps): React.JSX.Element {
  return (
    <button className={styles.default_button} onClick={onClick}>
      {children}
    </button>
  );
}