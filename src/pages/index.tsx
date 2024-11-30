import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getSortedPostsData } from "../lib/getMDXPosts";
import styles from "../styles/pages.module.css";
import Datetime from "../components/datetime";
import Index from "../components/mdx/index.mdx";
import { PostData } from "../mdxtypes";
import PropTypes from "prop-types";
import Header from "../components/header";

function CustomH1({ children }) {
  return <h1 style={{ fontSize: "30px", marginTop: "0px"}}>{children}</h1>;
}

CustomH1.propTypes = {
  children: PropTypes.node.isRequired, 
};

const overrideComponents = {
  h1: CustomH1,
};

interface HomeProps {
  posts: PostData[];
}

export async function getStaticProps() {
  const posts = getSortedPostsData().slice(0, 4);
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: HomeProps) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Header/>
      <div>
        {/* Passando os componentes personalizados para o Index */}
        <Index components={overrideComponents} />
      </div>
      <h2 className={styles.recents_h2}>recentes</h2>
      <div>
        <ul className={styles.recents_ul}>
          {posts.map((post) => (
            <li key={post.id} className={styles.recents_li}>
              <div className={styles.recents_ul_datetime}>
                <Datetime date={post.date} short={false} />
              </div>
              <div>
                <Link href={`/blog/${encodeURIComponent(post.slug)}`} >
                  <div>{post.title}</div>
                  {/* <div className={styles.recents_li_subtitle}>
                    {post.subtitle && post.subtitle.length > 0 ? `${post.subtitle}` : ""}
                  </div> */}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className={styles.vejamais}>
        <Link href="/blog">Veja mais...</Link>
      </div> */}
    </>
  );
}
