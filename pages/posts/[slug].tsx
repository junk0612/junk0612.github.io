import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../../components/Layout'
import { MarkdownContent } from '../../components/MarkdownContent'
import PostRepository from '../../lib/repositories/post'
import { Content } from '../../lib/content'
import { SITENAME } from '../../lib/constant'
import { markdownToHtml } from '../../lib/markdownToHtml'

type Props = {
  post: Content
  content: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await PostRepository.list()
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug
  if (typeof slug !== 'string') {
    return { notFound: true }
  }
  const post = await PostRepository.findBySlug(slug)
  const content = await markdownToHtml(post.body)
  return { props: { post, content } }
}

const Post: NextPage<Props> = ({ post, content }) => {
  return (
    <>
      <Head>
        <title>{post.title} | {SITENAME}</title>
      </Head>
      <Layout>
        <MarkdownContent 
          title={post.title}
          published={new Date(post.published).toLocaleDateString('ja-JP')}
          tags={post.tags}
          content={content}
        />
      </Layout>
    </>
  )
}

export default Post