import Index from "../../components/mdx/index.mdx"
import { getSortedPostsData } from "../../lib/getMDXPosts";
import PostList from "../../components/tsx/post_list";
import styles from "./home.module.css"

export default function Home() {

  const posts = getSortedPostsData().slice(0, 3);

  return (
    <section>
      <div>
        <Index />
      </div>
      <div className={styles.recentes}>
        <h1>recentes</h1>
        <div className={styles.recentes_list}>
          <PostList posts={posts} />
        </div>
      </div>
    </section>
  );
}
