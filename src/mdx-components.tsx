import type { MDXComponents } from "mdx/types";
import styles from "../src/styles/mdx-components.module.css";
import React from "react";

// Este arquivo permite fornecer componentes React customizados
// para serem usados em arquivos MDX, como o <hr>.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Personalizando <a> para abrir links em uma nova aba
    a: ({ href, children, ...props }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),

    // Personalizando <h1> usando styles
    h1: (props) => <h1 {...props} className={styles.customH} />,
    // Personalizando <h1> usando styles
    h2: (props) => <h1 {...props} className={styles.customH} />,
    // Personalizando <h1> usando styles
    h3: (props) => <h1 {...props} className={styles.customH} />,


    // Personalizando <hr> usando styles
    hr: (props) => <hr {...props} className={styles.customHR} />,

    ...components,
  };
}
