import { GetStaticProps, NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { Pagination } from '../../components/Pagination'
import { ContentList } from '../../components/ContentList'
import { range } from '../../lib/range'
import { sortByPublishedDate } from '../../lib/sortByPublishedDate'
import PostRepository from '../../lib/repositories/post'
import { ContentWithoutBody } from '../../lib/content'
import { postPath, postsPagePath } from '../../lib/path'
import { SEO } from '../../components/SEO'

const perPage = 20

type Props = {
  posts: ContentWithoutBody[];
  currentPage: number;
  pages: number[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const currentPage = 1
  const posts = await PostRepository.list()
  const sorted = sortByPublishedDate(posts)
  const sliced = sorted.slice(
    perPage * (currentPage - 1),
    perPage * currentPage
  )
  const maxPageNumer = Math.ceil(posts.length / 20)
  const pages = range(maxPageNumer)

  return {
    props: { posts: sliced, currentPage, pages },
  }
}

const Posts: NextPage<Props> = ({ posts, pages, currentPage }) => {
  const entries = posts.map((post) => ({
    title: post.title,
    published: post.published,
    path: postPath({ slug: post.slug }),
  }))

  return (
    <>
      <SEO
        title="Posts"
        description="ブログ記事一覧。日常の技術的な思考や学んだことを書いています。"
        url="https://junk0612.net/posts"
      />
      <Layout>
        <h1 className="text-3xl mb-4">Posts</h1>
        <ContentList entries={entries} />
        <Pagination
          pages={pages}
          currentPage={currentPage}
          pathFunc={postsPagePath}
        />
      </Layout>
    </>
  )
}

export default Posts