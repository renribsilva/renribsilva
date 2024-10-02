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
      <a href="/feed.xml" aria-label="Feed RSS" target="_blank" rel="noopener noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6" // Classes para estilização, se você estiver usando Tailwind CSS
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24px"
          height="24px"
        >
          <path d="M4.93 4.93A10.027 10.027 0 0 1 12 2c5.52 0 10 4.48 10 10a9.96 9.96 0 0 1-1.88 5.83l-1.45-1.45A7.974 7.974 0 0 0 20 12c0-4.41-3.59-8-8-8a7.96 7.96 0 0 0-5.83 2.42l1.45 1.45zM3.25 6.88A9.978 9.978 0 0 0 2 12c0 1.66.39 3.24 1.08 4.63l1.41-1.41A7.982 7.982 0 0 1 4 12c0-4.42 3.58-8 8-8a7.977 7.977 0 0 1 5.63 2.38l1.41-1.41A9.973 9.973 0 0 0 12 4c-5.24 0-9.5 4.26-9.75 9.75z" />
        </svg>
      </a>
    </>
  );
}