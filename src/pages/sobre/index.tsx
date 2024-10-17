import Sobre from "../../components/mdx/sobre.mdx";
import styles from "../../styles/pages.module.css";
import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/header";
import Breadcrumb from "../../components/breadcrumb";

// Validação de propriedades para o componente CustomList
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

// Função para obter título e descrição
export const getStaticProps = async () => {
  // Simulando a recuperação do título e da descrição
  const title = "Sobre | Petricor"; // Substitua conforme necessário
  const description = "Saiba quando começou, como foi feito e para onde pode ir o nosso blog."; // Substitua conforme necessário
  
  return {
    props: {
      title, // Exporta o título
      description, // Exporta a descrição
    },
  };
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
