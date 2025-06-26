import { ContentWithoutBody } from './content'

export function sortByPublishedDate(
  contents: ContentWithoutBody[]
): ContentWithoutBody[] {
  return contents.sort((a, b) => {
    return new Date(b.published).getTime() - new Date(a.published).getTime()
  })
}
