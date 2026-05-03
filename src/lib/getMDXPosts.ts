import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '../types';

export function getSortedPostsData(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'src/content');
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        ...data as Post,
      };
    })
    .filter((post) => post.draft !== true);

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));

}
