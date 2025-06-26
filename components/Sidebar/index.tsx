import Link from 'next/link'
import { TagList } from '../TagList'

type Props = {
  recentArticles?: Array<{
    slug: string
    title: string
  }>
  allTags?: string[]
}

export const Sidebar: React.FC<Props> = ({ recentArticles = [], allTags = [] }) => {
  return (
    <aside className="w-full lg:w-80 space-y-8">
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">About</h2>
        <p className="text-sm text-gray-600">
          junk0612のブログです。技術的な内容を中心に書いています。
        </p>
      </section>

      {recentArticles.length > 0 && (
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Articles</h2>
          <ul className="space-y-2">
            {recentArticles.map((article) => (
              <li key={article.slug}>
                <Link href={`/articles/${article.slug}`}>
                  <a className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                    {article.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {allTags.length > 0 && (
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Tags</h2>
          <TagList tags={allTags} />
        </section>
      )}

      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Links</h2>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://twitter.com/junk0612" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Twitter
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/junk0612" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              GitHub
            </a>
          </li>
        </ul>
      </section>
    </aside>
  )
}