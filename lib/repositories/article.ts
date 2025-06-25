import fs from 'fs'
import { join } from 'path'
import { getFiles } from '../getFiles'
import matter from 'gray-matter'
import { Article, ArticleWithoutContent } from '../article'

const articleDir = join(process.cwd(), 'contents', 'articles')

const list = async (): Promise<ArticleWithoutContent[]> => {
  const files = await getFiles(articleDir)
  return Promise.all(
    files.map(async (file) => {
      const { title, published, tags, slug } = await findByPath(file)
      return { title, published, tags, slug }
    })
  )
}

const listByTag = async (tag: string): Promise<ArticleWithoutContent[]> => {
  const articles = await list()
  return articles.filter((article) => article.tags?.includes(tag))
}

const findByPath = async (path: string): Promise<Article> => {
  const fileContents = fs.readFileSync(path, 'utf-8')
  const {
    data: { title, tags, published },
    content,
  } = matter(fileContents)
  const slug = path.split('/').splice(-1)[0].replace(/\.md$/, '')
  return { title, published, tags: tags ?? [], content, slug } as Article
}

const findBySlug = async (slug: string): Promise<Article> => {
  return findByPath(join(articleDir, `${slug}.md`))
}

const ArticleRepository = { list, listByTag, findByPath, findBySlug }

export default ArticleRepository
