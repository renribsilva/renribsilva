import Sobre from "../../components/mdx/sobre.mdx";
import styles from "../../styles/pages.module.css";
import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/header";
import Breadcrumb from "../../components/breadcrumb";

CustomList.propTypes = {
  children: PropTypes.node.isRequired, // Adiciona validação para 'children'
  as: PropTypes.elementType.isRequired, // Adiciona validação para 'as'
};

// Componente genérico para <ul> e <ol>
function CustomList({ children, as: Component }) {
  return <Component style={{ marginLeft: "10px" }}>{children}</Component>;
}

// Guardo os componentes em um objeto
const overrideComponents = {
  ul: (props) => <CustomList {...props} as="ul" />, 
  ol: (props) => <CustomList {...props} as="ol" />, 
};

export default function About() {
  return (
    <>
      <Header 
        titlePre="Sobre"
      />
      <Breadcrumb />
      <div className={styles.sobre_mdx}>
        <Sobre components={overrideComponents}/>
      </div>
      <div className={styles.sobre_mdxrodape}></div>
    </>
  );
}
