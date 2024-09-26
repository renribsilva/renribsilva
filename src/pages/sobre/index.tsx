import Head from "next/head";
import Sobre from "../../content/others/sobre.mdx";
import Titles from "../../components/titles";
import styles from "../../styles/mdx.module.css"

// Componente personalizado para <p>
function CustomP({ children }) {
  return <p style={{ marginLeft: '40px' }}>{children}</p>;
}

// Componente genérico para <ul> e <ol>
function CustomList({ children, as: Component }) {
  return <Component style={{ marginLeft: '60px' }}>{children}</Component>;
}

// Componentes sobrepostos
const overrideComponents = {
  p: CustomP, // Usando o componente personalizado para <p>
  ul: (props) => <CustomList {...props} as="ul" />, // Usando o componente personalizado para <ul>
  ol: (props) => <CustomList {...props} as="ol" />, // Usando o componente personalizado para <ol>
};

export default function About() {
  return (
    <>
      <Head>
        <title>Sobre | Petricor</title>
      </Head>
      <Titles 
        h1Text='Sobre' 
        h2Text='De onde veio, como foi feito e para onde vai este saite-blog?'
      />
      <Sobre components={overrideComponents} />
      <div className={styles.mdxrodape}></div>
    </>
  );
}
