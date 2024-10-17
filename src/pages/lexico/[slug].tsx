import { getNotionPosts } from "../../lib/getNotionPosts"; // Importa a função para obter os posts
import { NotionPage } from "../../notiontypes";
import { GetStaticPaths, GetStaticProps } from "next";
import styles from "../../styles/pages.module.css";
import Datetime from "../../components/datetime";
import React from "react";
import Header from "../../components/header";
import Breadcrumb from "../../components/breadcrumb";

// Função para gerar as rotas dinâmicas
export const getStaticPaths: GetStaticPaths = async () => {
  const database = await getNotionPosts();
  
  // Verifica se a consulta retornou resultados
  if (!database || !database.results) {
    return { paths: [], fallback: false }; // Retorna 404 se não houver resultados
  }

  const paths = database.results.map((post: NotionPage) => ({
    params: { 
      slug: post.properties.Page.title[0].plain_text
        .replace(/\s+/g, "") // Remove espaços
        .replace(/-/g, "") // Remove hífens
        .toLowerCase() // Converte para minúsculas
    },
  }));

  return {
    paths,
    fallback: false, // Retorna 404 para slugs não encontrados
  };
};

// Função para obter os dados do post baseado no slug
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!; // Obtém o slug dos parâmetros
  const database = await getNotionPosts();
  
  // Verifica se a consulta retornou resultados
  if (!database || !database.results) {
    return { notFound: true }; // Retorna 404 se não houver resultados
  }

  // Encontre o post correspondente ao slug
  const post = database.results.find((post: NotionPage) => {
    const postSlug = post.properties.Page.title[0].plain_text
      .replace(/\s+/g, "") // Remove espaços
      .replace(/-/g, "") // Remove hífens
      .toLowerCase(); // Converte para minúsculas
    return postSlug === slug; // Compare o slug formatado com o slug obtido da URL
  });

  // Se o post não for encontrado, retorna 404
  if (!post) {
    return { notFound: true };
  }

  console.log(post); // Adicione isso para ver o que está sendo retornado

  return {
    props: {
      post,
      title: "Léxico | Petricor",
      description: `Às vezes as palavras significam muito mais do que dizem os verbetes de dicionários. Aqui está o que ${slug} às vezes significa para mim.`, // Renomeia para description
    },
  };
};

// Tipando as props do componente Post
interface PostProps {
  post: NotionPage; // Renomeado para post
  description: string; // Renomeado para description
}

const Post = ({ post }: PostProps) => {
  return (
    <>
      <Header titlePre="Léxico"/>
      <Breadcrumb />
      <section className={styles.lexicoslug}>
        <div>
          <h1>{post.properties.Page.title[0].plain_text.replace(/-/g, "·")}</h1>
          <div>
            <span>
              <Datetime date={post.created_time}></Datetime>
            </span>
          </div>
        </div>
        <p>
          {post.properties.Slug.rich_text.map((item) => item.plain_text).join(" ")} {/* Exibe o slug */}
        </p>
      </section>
    </>
  );
};

export default Post;
