import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getSortedPostsData } from "../lib/getCollection";
import styles from "../styles/pages.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Datetime from "../components/datetime";
import Linkbutton from "../components/linkbutton";
import Index from "../components/mdx/index.mdx";
import { PostData } from "../mdxtypes";
import PropTypes from "prop-types";

interface HomeProps {
  posts: PostData[]; // Define que posts é um array de PostData
}

export async function getStaticProps() {
  const posts = getSortedPostsData().slice(0, 2);
  return {
    props: {
      posts,
    },
  };
}

// Adiciona validação para 'children'
CustomH1.propTypes = {
  children: PropTypes.node.isRequired,
};

// Componente personalizado para <p>
function CustomH1({ children }) {
  return <p style={{ marginTop: "0px", fontSize: "30px", fontWeight:"bold" }}>{children}</p>;
}

// Guarda o componente <h1> em um objeto
const overrideComponents = {
  h1: CustomH1, 
};
 
export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Head>
        <title>Petricor</title>
      </Head>
      <div className={styles.index_mdx}>
        <Index components={overrideComponents}/>
      </div>
      <div>
        <h1>Recentes</h1>
      </div>
      <div>
        <ul className={styles.recents_ul}>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/textos/${encodeURIComponent(post.slug)}`} legacyBehavior>
                <h1>{post.title}{" "}</h1>
              </Link>
              <div>
                <span>
                  <Datetime
                    date={post.date}
                    short={false}
                  />
                </span>
              </div>
              <p>{post.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <section className={styles.linkbutton}>
        <Linkbutton href="/textos/" ariaLabel='seta à direita, que envia para todos os textos'>
          Todos os textos
          <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
        </Linkbutton>
      </section>
    </>
  );
}