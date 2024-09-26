import { ThemeProvider } from 'next-themes';
import Layout from '../layout/layout';
import { useMDXComponents } from '../mdx-components'; // Ajuste conforme necessário
import { MDXProvider } from '@mdx-js/react'; // Importar o MDXProvider
import '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
  // Obtenha os componentes personalizados
  const components = useMDXComponents({});

  return (
    <ThemeProvider>
      <Layout>
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </Layout>
    </ThemeProvider>
  );
}
