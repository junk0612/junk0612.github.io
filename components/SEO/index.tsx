import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  ogImage?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
}

export const SEO: React.FC<SEOProps> = ({
  title = 'junk0612',
  description = 'junk0612のブログ。プログラミングや技術的な記事を投稿しています。',
  ogImage = 'https://junk0612.net/og-image.png',
  url = 'https://junk0612.net',
  type = 'website',
  publishedTime
}) => {
  const fullTitle = title === 'junk0612' ? title : `${title} | junk0612`
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="junk0612" />
      <meta property="og:locale" content="ja_JP" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
    </Head>
  )
}