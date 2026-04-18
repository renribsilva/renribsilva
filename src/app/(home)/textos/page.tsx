import { getSortedPostsData } from "../../../lib/getMDXPosts";
import PostList from "../../../components/tsx/post_list";
import { Post } from "../../../types";

export default async function TextosPage() {

  const allPosts = getSortedPostsData() as Post[];

  return (
    <>
      <section>
        <PostList posts={allPosts} />
      </section>
    </>
  );
}