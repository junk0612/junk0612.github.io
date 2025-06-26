import fs from 'fs'
import { join } from 'path'
import { getFiles } from '../getFiles'
import matter from 'gray-matter'
import { Content, ContentWithoutBody } from '../content'

const articleDir = join(process.cwd(), 'contents', 'articles')

const list = async (): Promise<ContentWithoutBody[]> => {
  const files = await getFiles(articleDir)
  return Promise.all(
    files.map(async (file) => {
      const { title, published, tags, slug } = await findByPath(file)
      return { title, published, tags, slug }
    })
  )
}

const listByTag = async (tag: string): Promise<ContentWithoutBody[]> => {
  const articles = await list()
  return articles.filter((article) => article.tags?.includes(tag))
}

const findByPath = async (path: string): Promise<Content> => {
  const fileContents = fs.readFileSync(path, 'utf-8')
  const {
    data: { title, tags, published },
    content,
  } = matter(fileContents)
  const slug = path.split('/').splice(-1)[0].replace(/\.md$/, '')
  return { title, published, tags: tags ?? [], body: content, slug } as Content
}

const findBySlug = async (slug: string): Promise<Content> => {
  return findByPath(join(articleDir, `${slug}.md`))
}

const ContentRepository = { list, listByTag, findByPath, findBySlug }

export default ContentRepository
