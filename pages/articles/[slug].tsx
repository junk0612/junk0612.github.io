import { GetStaticPaths, GetStaticProps } from 'next'
import { join } from 'path'
import { Layout } from '../../components/Layout'
import { MarkdownContent } from '../../components/MarkdownContent'
import { getFiles } from '../../lib/getFiles'
import { markdownToHtml } from '../../lib/markdownToHtml'
import ContentRepository from '../../lib/repositories/article'
import { Content } from '../../lib/content'
import { SITENAME } from '../../lib/constant'
import { SEO } from '../../components/SEO'

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDir = join(process.cwd(), 'contents', 'articles')
  const files = await getFiles(articlesDir)
  const slugs = files.map((file) =>
    file.split('/').slice(-1)[0].replace(/\.md$/, '')
  )

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

type Props = {
  article: Content;
  content: string;
};

type Params = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const article = await ContentRepository.findBySlug(params!.slug)
  const content = await markdownToHtml(article.body)

  return {
    props: {
      article,
      content,
    },
  }
}

const Article: React.FC<Props> = ({ article, content }) => {
  const description = article.body.replace(/[#\n]/g, '').replace(/\*\*/g, '').replace(/```[\s\S]*?```/g, '')?.slice(0, 160) || ''
  const { title, published, tags } = article

  return (
    <>
      <SEO 
        title={title}
        description={description}
        url={`https://junk0612.net/articles/${article.slug}`}
        type="article"
        publishedTime={published}
      />
      <Layout>
        <MarkdownContent
          title={title}
          published={published}
          tags={tags}
          content={content}
        />
      </Layout>
    </>
  )
}

export default Article
