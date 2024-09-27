import { ThemeProvider } from 'next-themes';
import { useMDXComponents } from '../mdx-components'; // Ajuste conforme necessário
import { MDXProvider } from '@mdx-js/react'; // Importar o MDXProvider
import '../styles/global.css';
import LayoutIndex from '../layout/layout_index';

export default function MyApp({ Component, pageProps }) {
  // Obtenha os componentes personalizados
  const components = useMDXComponents({});

  return (
    <ThemeProvider>
      <LayoutIndex>
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </LayoutIndex>
    </ThemeProvider>
  );
}
