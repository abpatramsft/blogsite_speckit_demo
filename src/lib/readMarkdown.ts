import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src/data/posts')

export async function readMarkdownFile(filename: string): Promise<string> {
  const fullPath = path.join(postsDirectory, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content)
  
  return processedContent.toString()
}

export function getMarkdownMetadata(filename: string): {
  title?: string
  date?: string
  [key: string]: any
} {
  const fullPath = path.join(postsDirectory, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  
  return matterResult.data
}
