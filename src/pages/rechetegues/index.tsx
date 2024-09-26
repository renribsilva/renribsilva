import Head from 'next/head';
import { getSortedPostsData, getPostData } from '../../lib/getCollection'; 
import { getUniqueTags } from '../../lib/getCollection'; // Importe a função para obter as tags
import { PostData } from '../../mdxtypes'; // Importe o tipo Post
import Datetime from '../../components/datetime';
import Titles from '../../components/titles';
import styles from "../../styles/textos.module.css"

interface GroupedPosts {
  [tag: string]: {
    frequency: number;
    posts: PostData[];
  };
}

export async function getStaticProps() {
  const postsData = getSortedPostsData();

  const posts = await Promise.all(
    postsData.map(async (post) => await getPostData(post.slug))
  );

  // Obtém as tags únicas com frequências
  const uniqueTagsWithFrequency = getUniqueTags();

  // Agrupa os posts por tag
  const groupedPosts: GroupedPosts = uniqueTagsWithFrequency.reduce((acc, { tag, frequency }) => {
    // Filtra os posts que contêm a tag
    const relatedPosts = posts.filter(post => post.tags.includes(tag));
    
    // Adiciona a tag e os posts ao acumulador
    acc[tag] = {
      frequency,
      posts: relatedPosts,
    };

    return acc;
  }, {} as GroupedPosts);

  return {
    props: {
      groupedPosts,
    },
  };
}

export default function Page({ groupedPosts }: { groupedPosts: GroupedPosts }) {
  return (
    <>
      <Head>
        <title>Textos | Petricor</title>
      </Head>
      <Titles 
        h1Text='Rechetegues' 
        h2Text='Todos os textos agrupados por #'
      />
      <section className={styles.arquivo}>
        {Object.entries(groupedPosts)
          .sort(([, a], [, b]) => b.frequency - a.frequency) // Ordena as tags pela frequência em ordem decrescente
          .map(([tag, { posts }]) => (
            <section key={tag}>
              <h3>#{tag}</h3> {/* Removido o exibição da frequência aqui */}
              <ul>
                {posts.map(post => (
                  <li key={post.id}>
                    <Datetime
                      date={post.date}
                      showDayMonth={true}
                    />
                    <a href={`/textos/${post.slug}`}>{post.title}</a>
                  </li>
                ))}
              </ul>
            </section>
        ))}
      </section>
    </>
  );
}
