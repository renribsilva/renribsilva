import { getSortedPostsData } from "../../../../../lib/getMDXPosts";
import PostList from "../../../../../components/tsx/post_list";
import TextNavLink from "../../../../../components/tsx/text_nav_link";
import { Post } from "../../../../../types";
import styles from "../../arquivo.module.css"

export default async function AnoPage({ params }: { params: { year: string } }) {
  
  const { year } = await params;
  const allPosts = getSortedPostsData() as Post[];
  const filteredPosts = allPosts.filter((post) => post.date.slice(0, 4) === year);

  return (
    <section className={styles.arquivo_button_container}>
      <div>
        {filteredPosts.length > 0 ? (
          <PostList posts={filteredPosts} />
        ) : (
          <p>Nenhum post encontrado para o ano {year}.</p>
        )}
      </div>
      <div>
        <TextNavLink href="/arquivo" ariaLabel="Voltar ao arquivo" direction="prev" />
      </div>
    </section>
  );
}