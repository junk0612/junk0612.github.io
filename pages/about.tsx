import { GetStaticProps } from 'next'
import fs from 'fs'
import { join } from 'path'
import { Layout } from '../components/Layout'
import { MarkdownContent } from '../components/MarkdownContent'
import { markdownToHtml } from '../lib/markdownToHtml'
import { SEO } from '../components/SEO'

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
      <SEO
        title="About"
        description="小林 純一 (Junichi Kobayashi) - Rails エンジニア。#LR_parser_gangs"
        url="https://junk0612.net/about"
      />
      <Layout>
        <article className="prose prose-gray max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </Layout>
    </>
  )
}

export default About
