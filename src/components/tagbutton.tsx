// components/Tagbutton.tsx
import Link from "next/link";
import styles from "../styles/components.module.css"; // ou o caminho correto para o seu CSS
import React from "react";

interface TagButtonProps {
  tag: string; // Define a prop 'tag' como string
  children?: React.ReactNode; // Adiciona children como uma prop opcional
}

const Tagbutton = ({ tag, children }: TagButtonProps): React.JSX.Element => {
  return (
    <Link href={`/tags/${tag}`} passHref>
      <button className={styles.default_button}>
        {children || `#${tag}`} {/* Use children se definido, caso contrário use o valor de tag */}
      </button>
    </Link>
  );
};

export default Tagbutton;
