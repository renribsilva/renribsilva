import { getSortedPostsData } from "../../../../../lib/getMDXPosts";
import PostList from "../../../../../components/tsx/post_list";
import { Post } from "../../../../../types";
import { formatString } from "../../../../../lib/formatString";

export default async function TagPage({ params }: { params: { tag: string } }) {
  
  const { tag } = await params;
  const allPosts = getSortedPostsData() as Post[];
  const filteredPosts = allPosts.filter((post) => 
    post.tags.some(t => formatString(t) === tag)
  );

  return (
    <section>
      {filteredPosts.length > 0 ? (
        <PostList posts={filteredPosts} />
      ) : (
        <p>Nenhum post encontrado para a tag {tag}.</p>
      )}
    </section>
  );
}