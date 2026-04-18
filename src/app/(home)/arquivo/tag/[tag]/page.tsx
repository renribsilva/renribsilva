import { getSortedPostsData } from "../../../../../lib/getMDXPosts";
import PostList from "../../../../../components/tsx/post_list";
import TextNavLink from "../../../../../components/tsx/text_nav_link";
import { Post } from "../../../../../types";
import { formatString } from "../../../../../lib/formatString";
import styles from "../../arquivo.module.css"

export default async function TagPage({ params }: { params: { tag: string } }) {
  
  const { tag } = await params;
  const allPosts = getSortedPostsData() as Post[];
  const filteredPosts = allPosts.filter((post) => 
    post.tags.some(t => formatString(t) === tag)
  );

  return (
    <section className={styles.arquivo_button_container}> 
      <div>
        {filteredPosts.length > 0 ? (
          <PostList posts={filteredPosts} />
        ) : (
          <p>Nenhum post encontrado para a tag {tag}.</p>
        )}
      </div>
      <div>
        <TextNavLink href="/arquivo" ariaLabel="Voltar ao arquivo" direction="prev" />
      </div>
    </section>
  );
}