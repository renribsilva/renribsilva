import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    
    a: ({ href, children, ...props }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),

    // Corrige os números do rodapé e listas ordenadas
    ol: ({ children }) => (
      <ol style={{ listStyleType: 'decimal', paddingLeft: '3rem', marginBottom: '1rem' }}>
        {children}
      </ol>
    ),

    li: ({ children, ...props }) => (
      <li {...props} style={{ marginBottom: '10 px' }}>
        {children}
      </li>
    ),

    // AJUSTE FINAL PARA AS NOTAS
    section: ({ children, ...props }) => {
      if (props['data-footnotes']) {
        return (
          <section 
            {...props} 
            className="custom-footnotes"
            style={{ 
              borderTop: '1px solid #ccc', 
              marginTop: '2rem', 
              paddingTop: '1rem',
              fontSize: '0.9rem' 
            }}
          >
            <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '1rem' }}>
              Notas de Rodapé
            </strong>
            {/* Injetamos um estilo local para as notas não herdarem o gap de 10px do li geral */}
            <style dangerouslySetInnerHTML={{ __html: `
              .custom-footnotes li { margin-bottom: 5px !important; }
              .custom-footnotes ol { list-style-type: decimal !important; padding-left: 1.5rem !important; }
            `}} />
            {children}
          </section>
        );
      }
      return <section {...props}>{children}</section>;
    },

    // Esconde o "Footnotes" original que o plugin cria
    h2: (props) => {
      if (props.id === 'footnote-label') {
        return null; // Mata o título em inglês
      }
      return <h2 {...props} />;
    },
  };
}