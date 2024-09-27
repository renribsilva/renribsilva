import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/getCollection';
import styles from "../styles/pages.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendar } from '@fortawesome/free-solid-svg-icons';
import Datetime from '../components/datetime';
import Linkbutton from '../components/linkbutton';
import Index from "../components/mdx/index.mdx"
import { PostData } from '../mdxtypes';
import Myhr from '../components/myhr';

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
 
function Home({ posts }: HomeProps) {
  return (
    <>
      <Head>
        <title>Petricor</title>
      </Head>
      <Myhr />
      <div className={styles.index_mdx}>
        <Index />
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
              <div className={styles.date}>
                <span>{<FontAwesomeIcon icon={faCalendar} />}</span>
                <span>
                  <Datetime
                    date={post.date}
                  />
                </span>
              </div>
              <p>{post.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <section className={styles.linkbutton}>
        <Linkbutton href="/textos/">
          Todos os textos
          <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
        </Linkbutton>
      </section>
      <Myhr />
    </>
  )
}
 
export default Home