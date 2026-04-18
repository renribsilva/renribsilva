import styles from "./components.module.css";
import React from "react";

interface TagButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ArchiveButton({ children, onClick, className }: TagButtonProps): React.JSX.Element {
  return (
    <button className={`${styles.default_button} ${className ?? ''}`} onClick={onClick}>
      {children}
    </button>
  );
}
