import Head from "next/head";
import Sobre from "../../components/mdx/sobre.mdx";
import styles from "../../styles/pages.module.css";
import React from "react";
import PropTypes from "prop-types";

CustomP.propTypes = {
  children: PropTypes.node.isRequired, // Adiciona validação para 'children'
};

CustomList.propTypes = {
  children: PropTypes.node.isRequired, // Adiciona validação para 'children'
  as: PropTypes.elementType.isRequired, // Adiciona validação para 'as'
};

// Componente personalizado para <p>
function CustomP({ children }) {
  return <p style={{ marginLeft: "40px" }}>{children}</p>;
}

// Componente genérico para <ul> e <ol>
function CustomList({ children, as: Component }) {
  return <Component style={{ marginLeft: "60px" }}>{children}</Component>;
}

// Guardo os componentes em um objeto
const overrideComponents = {
  p: CustomP,
  ul: (props) => <CustomList {...props} as="ul" />, 
  ol: (props) => <CustomList {...props} as="ol" />, 
};

export default function About() {
  return (
    <>
      <Head>
        <title>Sobre | Petricor</title>
      </Head>
      <div className={styles.sobre_mdx}>
        <Sobre components={overrideComponents}/>
      </div>
      <div className={styles.sobre_mdxrodape}></div>
    </>
  );
}
