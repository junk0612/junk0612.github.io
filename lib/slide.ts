import { useEffect, useState } from 'react'

export type Slide = {
  title: string
  published: string
  tags: string[]
  slug: string
}

export type SlideWithContent = Slide & { content: string }

export const slides: Slide[] = [
  {
    title: 'Blog つくりました',
    published: '2022/06/24',
    tags: ['JS', 'Next.js', 'Rust'],
    slug: 'new-blog',
  },
  {
    title: 'ふりかえり手法KPTAの紹介',
    published: '2023/01/06',
    tags: ['Agile', 'Retrospective'],
    slug: 'about-kpta',
  },
]

export const useSlide = () => {
  const [Reveal, setReveal] = useState<RevealStatic>()
  const [RevealMarkdown, setRevealMarkdown] = useState<Plugin>()
  const [Highlight, setHighlight] = useState<Plugin>()

  useEffect(() => {
    const clientSideInitialization = async () => {
      if (Reveal == null) {
        setReveal(await (await import('reveal.js')).default)
      } else if (RevealMarkdown == null) {
        setRevealMarkdown(
          await (
            await import('reveal.js/plugin/markdown/markdown.esm')
          ).default
        )
      } else if (Highlight == null) {
        setHighlight(
          await (
            await import('reveal.js/plugin/highlight/highlight.esm')
          ).default
        )
      } else {
        await Reveal.initialize({
          plugins: [RevealMarkdown, Highlight],
          embedded: true,
          shuffle: false,
          history: true,
        })
      }
    }
    clientSideInitialization()
  }, [Reveal, RevealMarkdown, Highlight])
}
