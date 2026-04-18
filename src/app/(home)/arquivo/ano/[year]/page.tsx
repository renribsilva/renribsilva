import { getSortedPostsData } from "../../../../../lib/getMDXPosts";
import PostList from "../../../../../components/tsx/post_list";
import { Post } from "../../../../../types";

export default async function AnoPage({ params }: { params: { year: string } }) {
  
  const { year } = await params;
  const allPosts = getSortedPostsData() as Post[];
  const filteredPosts = allPosts.filter((post) => post.date.slice(0, 4) === year);

  return (
    <section>
      {filteredPosts.length > 0 ? (
        <PostList posts={filteredPosts} />
      ) : (
        <p>Nenhum post encontrado para o ano {year}.</p>
      )}
    </section>
  );
}