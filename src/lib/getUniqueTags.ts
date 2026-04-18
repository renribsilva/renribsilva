import { getSortedPostsData } from "./getMDXPosts";

export function getUniqueTags() {
  const posts = getSortedPostsData();
  const allTags: string[] = posts.flatMap((post) => post.tags);
  const tagFrequency: Record<string, number> = {};

  allTags.forEach((tag) => {
    tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
  });

  const uniqueTagsWithFrequency = Object.entries(tagFrequency).map(([tag, frequency]) => ({
    tag,
    frequency,
  }));

  return uniqueTagsWithFrequency;
}