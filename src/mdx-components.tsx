import type { MDXComponents } from 'mdx/types';
import styles from '../src/styles/mdx.module.css';

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

    // Personalizando <hr> usando styles
    hr: (props) => <hr {...props} className={styles.customHr} />,

    ...components,
  };
}
