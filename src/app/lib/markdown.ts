import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd())

interface MarkdownData {
  contentHtml: string
  title: string
}


export async function getMarkdownFileData(): Promise<MarkdownData> {
  const fullPath = path.join(contentDirectory, `README.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    title: matterResult.data.title,
  };
}