import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { MarkdownContent } from '../../components/MarkdownContent'
import PostRepository from '../../lib/repositories/post'
import { Content } from '../../lib/content'
import { markdownToHtml } from '../../lib/markdownToHtml'
import { SEO } from '../../components/SEO'

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
  const description = post.body.replace(/[#\n]/g, '').replace(/\*\*/g, '').replace(/```[\s\S]*?```/g, '')?.slice(0, 160) || ''
  
  // Convert published date to ISO 8601 format
  const publishedISO = new Date(post.published).toISOString()
  
  return (
    <>
      <SEO 
        title={post.title}
        description={description}
        url={`https://junk0612.net/posts/${post.slug}`}
        type="article"
        publishedTime={publishedISO}
      />
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