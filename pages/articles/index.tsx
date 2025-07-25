import { GetStaticProps, NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { Pagination } from '../../components/Pagination'
import { ContentList } from '../../components/ContentList'
import { range } from '../../lib/range'
import { sortByPublishedDate } from '../../lib/sortByPublishedDate'
import ArticleRepository from '../../lib/repositories/article'
import { ContentWithoutBody } from '../../lib/content'
import { articlePath, articlesPagePath } from '../../lib/path'
import { SEO } from '../../components/SEO'

const perPage = 20

type Props = {
  articles: ContentWithoutBody[];
  currentPage: number;
  pages: number[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const currentPage = 1
  const articles = await ArticleRepository.list()
  const sorted = sortByPublishedDate(articles)
  const sliced = sorted.slice(
    perPage * (currentPage - 1),
    perPage * currentPage
  )
  const maxPageNumer = Math.ceil(articles.length / 20)
  const pages = range(maxPageNumer)

  return {
    props: { articles: sliced, currentPage, pages },
  }
}

const Articles: NextPage<Props> = ({ articles, pages, currentPage }) => {
  const entries = articles.map((article) => ({
    title: article.title,
    published: article.published,
    path: articlePath({ slug: article.slug }),
  }))

  return (
    <>
      <SEO
        title="Articles"
        description="技術記事一覧。プログラミング、パーサジェネレータ、Rubyなどの記事を投稿しています。"
        url="https://junk0612.net/articles"
      />
      <Layout>
        <h1 className="text-3xl mb-4">Articles</h1>
        <ContentList entries={entries} />
        <Pagination
          pages={pages}
          currentPage={currentPage}
          pathFunc={articlesPagePath}
        />
      </Layout>
    </>
  )
}

export default Articles
