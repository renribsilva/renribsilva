import { TagUnique } from "../types";
import { getSortedPostsData } from "./getMDXPosts";

export function getUniqueTags(): TagUnique[] {
  const posts = getSortedPostsData();
  const allTags: string[] = posts.flatMap((post) => post.tags);
  const tagFrequency: Record<string, number> = {};

  allTags.forEach((tag) => {
    tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
  });

  const uniqueTagsWithFrequency: TagUnique[] = Object.entries(tagFrequency).map(([tag, frequency]) => ({
    tag,
    frequency,
  }));
  console.log(uniqueTagsWithFrequency)
  return uniqueTagsWithFrequency;
}
getUniqueTags()
