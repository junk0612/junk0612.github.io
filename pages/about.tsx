import { GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs'
import { join } from 'path'
import { Layout } from '../components/Layout'
import { MarkdownContent } from '../components/MarkdownContent'
import { markdownToHtml } from '../lib/markdownToHtml'
import { SITENAME } from '../lib/constant'

type Props = {
  content: string
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const aboutPath = join(process.cwd(), 'contents', 'about.md')
  const aboutContent = fs.readFileSync(aboutPath, 'utf-8')
  const content = await markdownToHtml(aboutContent)

  return {
    props: {
      content,
    },
  }
}

const About: React.FC<Props> = ({ content }) => {
  return (
    <>
      <Head>
        <title>About | {SITENAME}</title>
      </Head>
      <Layout
        title={`About | ${SITENAME}`}
        description="小林 純一 (Junichi Kobayashi) - Rails エンジニア。LR パーサアルゴリズムとパーサジェネレータに強い関心を持つ。Ruby コミュニティでの活動も活発。#LR_parser_gangs"
      >
        <article className="prose prose-gray max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </Layout>
    </>
  )
}

export default About