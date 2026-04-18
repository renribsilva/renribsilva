import { getSortedPostsData } from "./getMDXPosts";

export function getUniqueYears() {
  
  const posts = getSortedPostsData();
  const years = [...new Set(posts.map(post => post.date.slice(0, 4)))].sort((a, b) => b - a);

  return years;
}