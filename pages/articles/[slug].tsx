import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { join } from 'path';
import { Layout } from '../../components/Layout';
import { MarkdownContent } from '../../components/MarkdownContent';
import { getFiles } from '../../lib/getFiles';
import { markdownToHtml } from '../../lib/markdownToHtml';
import ArticleRepository from '../../lib/repositories/article';
import { Article } from '../../lib/article';
import { SITENAME } from '../../lib/constant';

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDir = join(process.cwd(), 'contents', 'articles');
  const files = await getFiles(articlesDir);
  const slugs = files.map((file) =>
    file.split('/').slice(-1)[0].replace(/\.md$/, '')
  );

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

type Props = {
  article: Article;
  content: string;
};

type Params = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const article = await ArticleRepository.findBySlug(params!.slug);
  const content = await markdownToHtml(article.content);

  return {
    props: {
      article,
      content,
    },
  };
};

const Article: React.FC<Props> = ({ article, content }) => {
  const description = article.content.replace(/[#\n]/g, '')?.slice(0, 160) || '';
  const ogImage = `https://wat-aro.dev/og-images/${article.slug}.png`;
  const { title, published, tags } = article;

  return (
    <>
      <Head>
        <title>{title} | {SITENAME}</title>
      </Head>
      <Layout
        title={`${title} | (wat-aro)`}
        description={description}
        ogImage={ogImage}
      >
        <MarkdownContent
          title={title}
          published={published}
          tags={tags}
          content={content}
        />
      </Layout>
    </>
  );
};

export default Article;
