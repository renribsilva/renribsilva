import React from "react";
import Link from "next/link";
import { getSortedPostsData } from "../lib/getMDXPosts";
import styles from "../styles/pages.module.css";
import Datetime from "../components/datetime";
import Index from "../components/mdx/index.mdx";
import { PostData } from "../mdxtypes";
import PropTypes from "prop-types";
import Header from "../components/header";
import Seo from "../components/seo";

// Componente personalizado para <h1>
function CustomH1({ children }) {
  return <h1 style={{ fontWeight: 200, fontSize: "2rem" }}>{children}</h1>;
}

CustomH1.propTypes = {
  children: PropTypes.node.isRequired, // Validação para children
};

// Objeto para sobrescrever os componentes do MDX
const overrideComponents = {
  h1: CustomH1,
};

interface HomeProps {
  posts: PostData[];
}

export async function getStaticProps() {
  const posts = getSortedPostsData().slice(0, 2);
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Seo 
        title="Petrior"
        description="Blog criado com Next.js e Notion dedicado ao aprendizado da escrita"
      />
      <Header/>
      <div>
        {/* Passando os componentes personalizados para o Index */}
        <Index components={overrideComponents} />
      </div>
      <h2 className={styles.recents_h2}>Recentes</h2>
      <div>
        <ul className={styles.recents_ul}>
          {posts.map((post) => (
            <li key={post.id} className={styles.recents_li}>
              <Datetime date={post.date} short={false} />
              <div>
                <Link href={`/blog/${encodeURIComponent(post.slug)}`} >
                  <div>{post.title}</div>
                  <div className={styles.recents_li_subtitle}>
                    {post.subtitle && post.subtitle.length > 0 ? `${post.subtitle}` : ""}
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.vejamais}>
        <Link href="/blog">Veja mais...</Link>
      </div>
    </>
  );
}
