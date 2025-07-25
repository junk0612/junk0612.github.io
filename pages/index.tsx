import Link from 'next/link'
import { SITENAME } from '../lib/constant'
import { Layout } from '../components/Layout'
import { ContentList } from '../components/ContentList'
import { ContentWithoutBody } from '../lib/content'
import { Entry } from '../lib/entry'
import ArticleRepository from '../lib/repositories/article'
import PostRepository from '../lib/repositories/post'
import SlideRepository from '../lib/repositories/slide'
import { GetStaticProps } from 'next'
import { articlePath, postPath } from '../lib/path'
import { SEO } from '../components/SEO'

interface HomeProps {
  articles: ContentWithoutBody[]
  posts: ContentWithoutBody[]
  slides: Entry[]
}

export default function Home({ articles, posts, slides }: HomeProps) {
  const articleEntries: Entry[] = articles.map((article) => ({
    title: article.title,
    published: article.published,
    path: articlePath({ slug: article.slug }),
  }))

  return (
    <>
      <SEO />
      <Layout>
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Latest Articles</h2>
          <ContentList entries={articleEntries} />
          <div className="text-right mt-4">
            <Link href="/articles" className="text-blue-600 hover:underline">
              View all articles →
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl mb-4">Latest Posts</h2>
          <ContentList entries={posts.map((post) => ({
            title: post.title,
            published: post.published,
            path: postPath({ slug: post.slug }),
          }))} />
          <div className="text-right mt-4">
            <Link href="/posts" className="text-blue-600 hover:underline">
              View all posts →
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl mb-4">Latest Slides</h2>
          <ContentList entries={slides} />
          <div className="text-right mt-4">
            <Link href="/slides" className="text-blue-600 hover:underline">
              View all slides →
            </Link>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allArticles = await ArticleRepository.list()
  const allPosts = await PostRepository.list()
  const allSlides = await SlideRepository.list()
  
  const articles = allArticles
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, 5)
    
  const posts = allPosts
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, 5)
    
  const slides = allSlides
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, 5)

  return {
    props: {
      articles,
      posts,
      slides,
    },
  }
}
