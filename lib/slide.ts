import { useEffect, useState } from 'react'

export type Slide = {
  title: string
  published: string
  tags: string[]
  slug: string
}

export type SlideWithContent = Slide & { content: string }

export const slides: Slide[] = [
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
