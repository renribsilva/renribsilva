import React from "react";
import Conjugador from "../../components/mdx/conjugador.mdx";
import Breadcrumb from "../../components/breadcrumb";
import Header from "../../components/header";

// Função para obter título e descrição
export const getStaticProps = async () => {
  // Simulando a recuperação do título e da descrição
  const ogtitle = "projetos | renribsilva"; // Substitua conforme necessário
  const ogdescription = "Projetos que estão sendo escritos pelo autor do blog"; // Substitua conforme necessário
  
  return {
    props: {
      ogtitle, // Exporta o título
      ogdescription, // Exporta a descrição
    },
  };
};

export default function Projetos () {
  return (
    <section>
      <Header titlePre="projetos" />
      <Breadcrumb />
      <Conjugador />
    </section>
  );
}