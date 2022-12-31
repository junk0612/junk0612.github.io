import Head from 'next/head'
import { useRouter } from 'next/router'

type Props = {
  title?: string
  ogImage?: string
  description?: string
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({
  title,
  description,
  ogImage,
  children,
}) => {
  const router = useRouter()
  const origin = 'https://junk0612.github.io'
  const currentUrl = `${origin}${router.asPath}`

  const ogTitle = title || "junk0612's slide"
  const ogDescription = description || 'junk0612 のスライド'
  const image = ogImage || `${origin}/images/default-ogimage.png`

  return (
    <>
      <Head>
        <meta name="title" content={ogTitle} />
        <meta name="description" content={ogDescription} />
        <meta property="og:locale" content="ja_jp" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="junk0612's slide" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={currentUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@junk0612" />
        <meta name="twitter:creator" content="@junk0612" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={image} />
      </Head>
      <div className="flex md:justify-center justify-between w-full flex-grow">
        <div className="flex flex-col sm:max-w-sm md:max-w-4xl w-full py-4 px-4">
          {children}
        </div>
      </div>
    </>
  )
}
