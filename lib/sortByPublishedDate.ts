import { ContentWithoutBody } from './types'

export function sortByPublishedDate(
  contents: ContentWithoutBody[]
): ContentWithoutBody[] {
  return contents.sort((a, b) => {
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  })
}
