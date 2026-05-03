import { getSortedPostsData } from "../../../lib/getMDXPosts";
import PostList from "../../../components/tsx/post_list";

export default async function TextosPage() {

  const allPosts = getSortedPostsData();

  return (
    <>
      <section>
        <PostList posts={allPosts} />
      </section>
    </>
  );
}
