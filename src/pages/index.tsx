import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/getCollection';
import IndexLayout from '../layout';
import styles from "../styles/index.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendar } from '@fortawesome/free-solid-svg-icons';
import Datetime from '../components/datetime';
import Linkbutton from '../components/linkbutton';
import Index from "../content/others/index.mdx"
import { PostData } from '../mdxtypes';

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
      <div className={styles.txt}>
        <Index />
      </div>
      <div className={styles.titles}>
        <h1>Recentes</h1>
      </div>
      <IndexLayout>
        <ul className={styles.ul}>
          {posts.map((post) => (
            <li className={styles.li} key={post.id}>
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
              <hr></hr>
            </li>
          ))}
        </ul>
      </IndexLayout>
      <section className={styles.linkbutton}>
        <Linkbutton href="/textos/">
          Todos os textos {"  "}
          <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
        </Linkbutton>
      </section>
    </>
  )
}
 
export default Home