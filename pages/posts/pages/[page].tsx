import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../../../components/Layout'
import { Pagination } from '../../../components/Pagination'
import { ContentList } from '../../../components/ContentList'
import { range } from '../../../lib/range'
import { sortByPublishedDate } from '../../../lib/sortByPublishedDate'
import PostRepository from '../../../lib/repositories/post'
import { ContentWithoutBody } from '../../../lib/content'
import { postPath, postsPagePath } from '../../../lib/path'
import { SITENAME } from '../../../lib/constant'

const perPage = 20

type Props = {
  posts: ContentWithoutBody[];
  currentPage: number;
  pages: number[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await PostRepository.list()
  const maxPageNumer = Math.ceil(posts.length / perPage)
  const pages = range(maxPageNumer)
  const paths = pages.map((page) => ({
    params: { page: String(page) },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const currentPage = Number(params?.page) || 1
  const posts = await PostRepository.list()
  const sorted = sortByPublishedDate(posts)
  const sliced = sorted.slice(
    perPage * (currentPage - 1),
    perPage * currentPage
  )
  const maxPageNumer = Math.ceil(posts.length / perPage)
  const pages = range(maxPageNumer)

  return {
    props: { posts: sliced, currentPage, pages },
  }
}

const PostsPage: NextPage<Props> = ({ posts, pages, currentPage }) => {
  const entries = posts.map((post) => ({
    title: post.title,
    published: post.published,
    path: postPath({ slug: post.slug }),
  }))

  return (
    <>
      <Head>
        <title>Posts - Page {currentPage} | {SITENAME}</title>
      </Head>
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

export default PostsPage