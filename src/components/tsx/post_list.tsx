import Link from "next/link";
import Datetime from "./datetime";
import { Post } from "../../types";
import styles from "./components.module.css"

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className={styles.post_list}>
      {posts.map((post) => (
        <li key={post.id} className={styles.post_item}>
          <div>
            <Datetime date={post.date} semishort={true} />
          </div>
          <Link href={`/textos/${post.slug}`}>
            <h3 className={styles.post_title}>[{post.title.replace(/·/g, "")}]</h3>
            {post.subtitle && (
              <p className={styles.post_subtitle}>{post.subtitle}</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}